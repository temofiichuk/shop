import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductField from "@/components/admin/ProductForm/ProductField";
import { memo } from "react";

const ProductDetails = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<ProductField name="name" />
					</div>
					<div className="grid gap-3">
						<ProductField type="textarea" name="description" />
					</div>
					<div className="grid gap-3">
						<ProductField type="number" name="base_price" />
					</div>
					<div className="grid gap-3">
						<ProductField type="number" name="stock" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
ProductDetails.displayName = "ProductDetails"
;
export default memo(ProductDetails);
