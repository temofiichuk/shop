"use client";
import styles from "./UserLoginForm.module.scss";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputPassword } from "@/components/ui/input-password";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/hooks/useAuth";
import { EnumUserRole, LoginInput } from "@/lib/graphql/generated/graphql";
import { FormProvider, useForm } from "react-hook-form";


const UserLoginForm = () => {
	const { dispatch, pending } = useAuth(EnumUserRole.User);

	const methods = useForm<LoginInput>({
		defaultValues: {
			email: "Janae_Ondricka56@hotmail.com",
			password: "dI2s8GnwsRh9BZc",
		},
	});

	return (
		<Card className={styles.form}>
			<FormProvider {...methods}>
				<form action={dispatch}>
					<CardHeader>
						<CardTitle className={styles.title}>Login</CardTitle>
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
						<Button className={styles.button} disabled={pending}>Sign in</Button>
					</CardFooter>;
				</form>
			</FormProvider>
		</Card>
	);
};


UserLoginForm.displayName = "AdminLoginForm";
export default UserLoginForm;