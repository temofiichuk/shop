import { Injectable } from "@nestjs/common";
import { CreateCategoryTypeInput } from "./dto/create-category-type.input";
import { UpdateCategoryTypeInput } from "./dto/update-category-type.input";
import { PrismaService } from "../../prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CategoryTypeService {
	constructor(
		private readonly prisma: PrismaService,
		private configService: ConfigService
	) {}

	create(createCategoryTypeInput: CreateCategoryTypeInput) {
		return this.prisma.categoryType.create({ data: createCategoryTypeInput });
	}

	async update({ id, ...updateCategoryTypeInput }: UpdateCategoryTypeInput) {
		return this.prisma.categoryType.update({
			where: { id },
			data: updateCategoryTypeInput,
		});
	}

	remove(id: number) {
		return this.prisma.categoryType.delete({ where: { id } });
	}

	findAll() {
		return this.prisma.categoryType.findMany();
	}
}
