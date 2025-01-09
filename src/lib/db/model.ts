import mongoose from "mongoose";

const createSchemaAndModel = (name: string) => {
  const schema = new mongoose.Schema({
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    data: {
      type: [String],
      required: true,
    },
  });

  return mongoose.models[name] || mongoose.model(name, schema);
};

const BtechSem1 = createSchemaAndModel("BtechSem1");
const BtechSem3 = createSchemaAndModel("BtechSem3");
const BtechSem5 = createSchemaAndModel("BtechSem5");
const BtechSem7 = createSchemaAndModel("BtechSem7");

const BtechSem2 = createSchemaAndModel("BtechSem2");
const BtechSem4 = createSchemaAndModel("BtechSem4");
const BtechSem6 = createSchemaAndModel("BtechSem6");
const BtechSem8 = createSchemaAndModel("BtechSem8");

const MtechMscSem2 = createSchemaAndModel("MtechMscSem2");
const MtechMscSem4 = createSchemaAndModel("MtechMscSem4");


export const modelMap = {
  "BTECH 1 SEM": BtechSem1,
  "BTECH 3 SEM": BtechSem3,
  "BTECH 5 SEM": BtechSem5,
  "BTECH 7 SEM": BtechSem7,

  "BTECH 2 SEM": BtechSem2,
  "BTECH 4 SEM": BtechSem4,
  "BTECH 6 SEM": BtechSem6,
  "BTECH 8 SEM": BtechSem8,

  "MTECH-MSc 2 SEM": MtechMscSem2,
  "MTECH-MSc 4 SEM, PhD2": MtechMscSem4
};
