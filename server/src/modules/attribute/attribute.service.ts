import { Injectable } from "@nestjs/common";
import { CreateAttributeInput } from "./dto/create-attribute.input";
import { UpdateAttributeInput } from "./dto/update-attribute.input";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class AttributeService {
	constructor(private readonly prisma: PrismaService) {
	}

	create({ values, ...data }: CreateAttributeInput) {
		return this.prisma.attribute.create({
			data: {
				...data,
				values: {
					connect: values.map(({ value }) => ({ value })),
				},
			},
		});
	}

	async findAll() {
		return this.prisma.attribute.findMany({
			include: { values: true },
		});
	}

	async findOne(id: number) {
		return this.prisma.attribute.findUnique({
			where: { id },
			include: { values: true },
		});
	}

	async update(id: number, { values, ...data }: UpdateAttributeInput) {
		return this.prisma.$transaction(async (prisma) => {

			const availableValuesIds = await prisma.attribute.findUnique({
				where: { id },
				select: {
					values: {
						select: { value: true },
					},
				},
			}).then(attr => attr.values.map(({ value }) => value));

			return prisma.attribute.update({
				where: { id },
				data: {
					...data,
					values: {
						disconnect: values.filter(({ value }) => !availableValuesIds.includes(value)),
						connect: values.map(({ value }) => ({ value })),
					},
				},
			});
		});
	}

	async remove(id: number) {
		return this.prisma.attribute.delete({
			where: { id },
		});
	}
}
