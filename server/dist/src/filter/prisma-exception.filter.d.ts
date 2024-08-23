import { Prisma } from "@prisma/client";
import { GqlExceptionFilter } from "@nestjs/graphql/dist/interfaces/gql-exception-filter.interface";
export declare class PrismaClientExceptionFilter implements GqlExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError): any;
}
