import { Catch, ConflictException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { GqlExceptionFilter } from "@nestjs/graphql/dist/interfaces/gql-exception-filter.interface";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError): any {
		switch (exception.code) {
			case "P2002": {
				throw new ConflictException("Not Unique Field");
			}
			case "P2003": {
				throw new UnprocessableEntityException("Entity Not Exist");
			}
			case "P2025": {
				throw new NotFoundException("Not Found");
			}
			default:
				throw exception;
		}
	}
}
