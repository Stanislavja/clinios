export const getMarkerInterpretation = (marker) => {
  const data = {
    high: [],
    low: [],
  };

  // Glucose
  if (marker === 866) {
    data.high = [
      {
        condition: "Acromegaly",
        comment: "Acromegaly is a disease caused by a chronic excess of growth hormone (GH) and consequently by increased circulating insulin-like growth factor 1 (IGF-1). Excess GH stimulates gluconeogenesis and lipolysis, causing hyperglycemia and elevated free fatty acid levels.",
        evidence: "Strong",
      },
      {
        condition: "Acute stress (Stress hyperglycemia)",
        comment: "The neuroendocrine response to stress is characterized by excessive gluconeogenesis, glycogenolysis and insulin resistance. Stress hyperglycemia, however, appears to be caused predominantly by increased hepatic output of glucose rather than impaired tissue glucose extraction",
        evidence: "Strong",
      },
      {
        condition: "Chronic kidney disease",
        comment: "The accumulation of uremic toxins and increased parathyroid hormone levels in patients with chronic renal failure (CRF) cause insulin resistance in tissues, particularly skeletal muscle tissues.",
        evidence: "Strong",
      },
    ];
    data.low = [
      {
        condition: "Adrenal insufficiency",
        comment: "Depleted cortisol increases insulin sensitivity in patients with adrenal insufficiency and is thought to involve hypoglycemia. The hypoglycemia related to adrenal insufficiency is thought to be more common in neonates and children than in adults. Cortisol is a catabolic hormone influencing carbohydrate, lipid, and protein metabolism.",
        evidence: "Strong",
      },
      {
        condition: "Hypopituitarism",
        comment: "Insufficient Adrenocorticotropic hormone (ACTH) secretion by pituitary glands  results in cortisol deficiency; therefore, hypopituitarism may cause hypoglycemic events in diabetic patients.",
        evidence: "Strong",
      },
    ];
  }
  return data;
};
