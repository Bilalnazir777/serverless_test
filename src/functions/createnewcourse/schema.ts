export default {
  type: "object",
  properties: {
    coursecode: { type: "string" },
    coursetitle: { type: "string" },
    CR: { type: "number" }


  },
  required: ['coursecode', 'coursetitle', 'CR',]
} as const;
