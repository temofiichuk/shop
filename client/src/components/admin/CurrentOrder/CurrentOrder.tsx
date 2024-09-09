"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { EnumUserRole, useDeleteOrderMutation, useOrderLazyQuery } from "@/lib/graphql/generated/graphql";
import moment from "moment/moment";
import { dateFormat } from "@/lib/helpers";
import { USD } from "@/lib/functions";
import useAppState from "@/lib/hooks/useAppState";
import { useCallback, useEffect, useRef } from "react";
import useSession from "@/lib/hooks/useSession";
import { toast } from "sonner";


const CurrentOrder = () => {
	const { session } = useSession();
	const ref = useRef(null);
	const [fetchOrder, { data: orderResult }] = useOrderLazyQuery();
	const [currentOrderId, setCurrentOrderId] = useAppState<number | null>("currentOrderId");

	const [deleteOrder] = useDeleteOrderMutation({
		update(cache, { data: { deleteOrder } }) {
			cache.modify({
				fields: {
					orders(existingOrdersRefs = [], { readField }) {
						return existingOrdersRefs.filter(
							ref => deleteOrder.id !== readField("id", ref),
						);
					},
				},
				optimistic: true,
			});
		},
		onCompleted: () => {
			setCurrentOrderId({ value: null });
		},
	});

	const deleteHandler = useCallback(() => {
		if (!currentOrderId) return;
		const isRootAdmin = session?.user.role === EnumUserRole.Rootadmin;
		toast.warning(!isRootAdmin ? "Are you sure you want to delete this order?" : "Only Root Admin can delete orders", {
			action: {
				label: !isRootAdmin ? "Delete" : "Undo",
				onClick: async () => {
					!isRootAdmin && await deleteOrder({ variables: { id: currentOrderId } });
				},
			},
			duration: 5000,
		});
	}, [session, currentOrderId]);

	useEffect(() => {
		if (!currentOrderId) return;
		fetchOrder({ variables: { id: currentOrderId } }).then(() => {
			if (!ref.current) return;
			ref.current.scrollIntoView();
		});
	}, [currentOrderId]);

	if (!orderResult?.order || !currentOrderId) return;
	const { order } = orderResult;


	return (
		<Card
			ref={ref}
			id="current-order"
			aria-label="order-info"
			className="overflow-hidden opacity-0 animate-out fade-out-100 duration-1000 ease-in-out fill-mode-forwards shadow-2xl w-full xl:sticky xl:top-16 xl:max-w-[35%] h-max"
		>
			<CardHeader className="flex flex-row items-start bg-muted/50 ">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Order {order.id}
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copy Order ID</span>
						</Button>
					</CardTitle>
					<CardDescription>Date: {moment(order.created_at).format(dateFormat)}</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<Truck className="h-3.5 w-3.5" />
						<span className="sr-only xl:not-sr-only xl:whitespace-nowrap">
							Track Order
						</span>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="outline" className="h-8 w-8">
								<MoreVertical className="h-3.5 w-3.5" />
								<span className="sr-only">More</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={deleteHandler}>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold">Order Details</div>
					<ul className="grid gap-3">

						{order.order_items.map((item) => (<li key={item.id} className="flex items-start gap-8 justify-between">
							<span className="text-muted-foreground">
								{item.product_variant.product.name}, {item.product_variant.variant_attribute_values.map(attr => (
								<span> {attr.name}: {attr.value} </span>))} x <span>{item.quantity}</span>
							</span>
							<span>{USD.format(item.price * item.quantity)}</span>
						</li>))}
					</ul>
					<Separator className="my-2" />
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<span>{USD.format(order.total_price - 5 - order.total_price * 0.19)}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Shipping</span>
							<span>{USD.format(5)}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Tax</span>
							<span>{USD.format(order.total_price * 0.19)}</span>
						</li>
						<li className="flex items-center justify-between font-semibold">
							<span className="text-muted-foreground">Total</span>
							<span>{USD.format(order.total_price)}</span>
						</li>
					</ul>
				</div>
				<Separator className="my-4" />
				<div className="grid grid-cols-2 gap-4">
					<div className="grid gap-3">
						<div className="font-semibold">Shipping Information</div>
						<address className="grid gap-0.5 not-italic text-muted-foreground">
							<span>{order.user.first_name} {order.user.last_name}</span>
							<span>{order.user.address}</span>
						</address>
					</div>
					<div className="grid auto-rows-max gap-3">
						<div className="font-semibold">Billing Information</div>
						<div className="text-muted-foreground">
							Same as shipping address
						</div>
					</div>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Customer Information</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Customer</dt>
							<dd>{order.user.first_name} {order.user.last_name}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Email</dt>
							<dd>
								<a href="mailto:">{order.user.email}</a>
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Phone</dt>
							<dd>
								<a href="tel:">{order.user.phone}</a>
							</dd>
						</div>
					</dl>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Payment Information</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="flex items-center gap-1 text-muted-foreground">
								<CreditCard className="h-4 w-4" />
								Visa
							</dt>
							<dd>**** **** **** 4532</dd>
						</div>
					</dl>
				</div>
			</CardContent>
			<CardFooter className="flex flex-row items-center border-t bg-muted/50  px-6 py-3">
				<div className="text-xs text-muted-foreground">
					Updated <time dateTime="2023-11-23">{moment(order.updated_at).format("MMMM DD, YYYY")}</time>
				</div>
			</CardFooter>
		</Card>
	);
};

CurrentOrder.displayName = "CurrentOrder";
export default CurrentOrder;