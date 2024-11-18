"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import useAuth from "@/lib/hooks/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EnumUserRole, LoginInput } from "@/lib/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const AdminLoginForm = () => {
	const { dispatch } = useAuth(EnumUserRole.Admin);

	const methods = useForm<LoginInput>({
		defaultValues: {
			email: "Deonte.Hoeger@hotmail.com",
			password: "sOFxsNfo27jbUg2",
		},
	});

	return (
		<Card className="w-full max-w-sm">
			<FormProvider {...methods}>
				<form action={dispatch}>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Admin</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input {...methods.register("email")} type="email" placeholder="admin@example.com" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<InputPassword {...methods.register("password")} />
						</div>

					</CardContent>
					<CardFooter className="grid gap-4">
						<Button asChild children={<SubmitButton children="Sign In" />} />
					</CardFooter>
				</form>
			</FormProvider>
		</Card>);
};


AdminLoginForm.displayName = "AdminLoginForm";
export default AdminLoginForm;