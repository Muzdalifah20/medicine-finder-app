// Main extractor - handles ALL FDA field types

export const getField = (drug, field) => {
  if (
    field === "generic_name" ||
    field === "route" ||
    field === "pharm_class_moa" ||
    field === "pharm_class_pe" ||
    field === "pharm_class_cs"
  ) {
    const values = drug?.openfda?.[field] || [];
    return Array.isArray(values) && values.length > 0
      ? values.join(", ")
      : "N/A";
  }

  const section = drug[field];
  if (!section) return "N/A";

  return section;
};

export const extractDrugInfo = (drug) => ({
  name: getField(drug, "generic_name"),
  activeIngredient: getField(drug, "active_ingredient"),
  routeOfAdministration: getField(drug, "route"),
  mechanismOfAction: getField(drug, "pharm_class_moa"),
  PhysiologicEffectOrPharmacodynamicEffect: getField(drug, "pharm_class_pe"),
  ChemicalStructureClassification: getField(drug, "pharm_class_cs"),
  purpose: getField(drug, "purpose"),
  conditions: getField(drug, "indications_and_usage"),
  dosage: getField(drug, "dosage_and_administration"),
  askDoctorOrPharmacist: getField(drug, "ask_doctor_or_pharmacist"),
  warnings: getField(drug, "warnings"),
  pregnancyOrBreastFeeding: getField(drug, "pregnancy_or_breast_feeding"),
  storage: getField(drug, "storage_and_handling"),
});
