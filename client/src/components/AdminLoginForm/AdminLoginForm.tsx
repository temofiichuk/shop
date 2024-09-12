"use client";
import styles from "./AdminLoginForm.module.scss";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import useAuth from "@/lib/hooks/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EnumUserRole, LoginInput } from "@/lib/graphql/generated/graphql";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

const AdminLoginForm = () => {
	const { error, dispatch } = useAuth(EnumUserRole.Admin);
	const router = useRouter();

	const methods = useForm<LoginInput>({
		defaultValues: {
			email: "Ona91@yahoo.com",
			password: "nNh8HQeaRF6D1Io",
		},
	});

	return (
		<Card className={styles.form}>
			<FormProvider {...methods}>

				<form action={async (formData) => {
					await dispatch(formData);
					router.refresh();
				}
				}>
					<CardHeader>
						<CardTitle className={styles.title}>Admin</CardTitle>
					</CardHeader>
					<CardContent className={styles.content}>
						<div className={styles.inputWrapper}>
							<Label htmlFor="email">Email</Label>
							<Input {...methods.register("email")} type="email" placeholder="admin@example.com" />
						</div>
						<div className={styles.inputWrapper}>
							<Label htmlFor="password">Password</Label>
							<InputPassword {...methods.register("password")} />
						</div>

					</CardContent>
					<CardFooter className={styles.content}>
						<Button asChild children={<SubmitButton children="Sign In" />} />
					</CardFooter>
				</form>
			</FormProvider>
		</Card>);
};


AdminLoginForm.displayName = "AdminLoginForm";
export default AdminLoginForm;