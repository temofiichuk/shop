import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memo } from "react";

const ProductStatus = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Status</CardTitle>
			</CardHeader>
			<CardContent>
				<Select>
					<SelectTrigger id="status" aria-label="Select status">
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="draft">Draft</SelectItem>
						<SelectItem value="published">Active</SelectItem>
						<SelectItem value="archived">Archived</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
		</Card>
	);
};
ProductStatus.displayName = "ProductStatus";
export default memo(ProductStatus);
