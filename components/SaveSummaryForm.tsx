"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  heart_rate: z.number(),
  temperature: z.number(),
  oxygen_saturation: z.number(),
  stystolic_bp: z.number(),
  diastolic_bp: z.number(),
  conversation_summary: z.string(),
});

type Summary = {
  heart_rate: number;
  temperature: number;
  oxygen_saturation: number;
  bloodpressure: { systolic: number; diastolic: number };
  conversation_summary: string;
};

export default function SaveSummaryForm({
  values,
  setIsDialogOpen,
}: {
  values: Summary;
  setIsDialogOpen: (value: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heart_rate: values.heart_rate,
      temperature: values.temperature,
      oxygen_saturation: values.oxygen_saturation,
      stystolic_bp: Number(values.bloodpressure.systolic),
      diastolic_bp: Number(values.bloodpressure.diastolic),
      conversation_summary: values.conversation_summary,
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsDialogOpen(false);

    // make api call here to save

    toast({
      title: "Summary Saved",
      description: "The summary has been saved successfully",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="heart_rate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Heart Rate</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Patient's heart rate in beats per minute.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Patient's temperature in degrees fareinheit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oxygen_saturation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oxygen Saturation</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Patient's oxygen saturation in percentage.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stystolic_bp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Systolic Blood Pressure</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Patient's systolic blood pressure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diastolic_bp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diastolic Blood Pressure</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Patient's diastolic blood pressure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conversation_summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary of Interaction</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Summary of the conversation with the patient.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
