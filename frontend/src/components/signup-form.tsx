import { FC } from "react";
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../../../src/schemas/SignupSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export const SignupForm: FC = () => {
    const form = useForm({
        resolver: zodResolver(SignupSchema),
    });

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="flex gap-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <InputGroup>
                                <InputGroupInput
                                    type="email"
                                    placeholder="example@gmail.com"
                                    {...field}
                                />
                                <InputGroupAddon>
                                    <MailIcon />
                                </InputGroupAddon>
                            </InputGroup>
                        </FormControl>
                    </FormItem>
                )}
            />
        </Form>
    );
};
