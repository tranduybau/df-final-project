"use client";

import * as z from "zod";

const formSchema = z.object({
  search: z.string().min(2),
});

export default formSchema;
