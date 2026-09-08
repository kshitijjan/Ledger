import { z } from 'zod';
const schema = z.object({ a: z.string() });
try {
  schema.parse({ a: 1 });
} catch (e: any) {
  console.log("e.errors:", e.errors);
  console.log("e.issues:", e.issues);
}
