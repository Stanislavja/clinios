/*
F=Female
M=Male
*/

export function calculateFunctionalRange(test, gender, age) {
  const range = {};
  if (test === "82947") { /* Glucose */
    range.low = 82.0;
    range.high = 88.0;
    return range;
  }
  if (test === "83036") { /* A1C */
    range.low = 5.0;
    range.high = 5.3;
    return range;
  }
  if (test === "84681") { /* C‐peptide */
    range.low = 1.1;
    range.high = 2.1;
    return range;
  }
  if (test === "82465") { /* Cholesterol Total */
    if (age <= 60) {
      range.low = 120;
      range.high = 240;
      return range;
    }
    if (age > 60) {
      if (gender === "M") {
        range.low = 170;
        range.high = 270;
        return range;
      }
      if (gender === "F") {
        range.low = 200;
        range.high = 300;
        return range;
      }
    }
  }
  if (test === "83721") { /* LDL Cholesterol */
    if (age <= 60) {
      range.low = 80;
      range.high = 170;
      return range;
    }
    if (age > 60) {
      range.low = 120;
      range.high = 170;
      return range;
    }
  }
  if (test === "83718") { /* HDL Cholesterol */
    if (gender === "M") {
      range.low = 55;
      range.high = 75;
      return range;
    }
    if (gender === "F") {
      range.low = 65;
      range.high = 85;
      return range;
    }
  }
  if (test === "VLDL") { /* VLDL Cholesterol */
    range.low = 0.0;
    range.high = 20.0;
    return range;
  }
  if (test === "84478") { /* Triglycerides */
    range.low = 50.0;
    range.high = 90.0;
    return range;
  }
  if (test === "84295") { /* Sodium */
    range.low = 139.0;
    range.high = 142.0;
    return range;
  }
  if (test === "84132") { /* Potassium */
    range.low = 4.0;
    range.high = 4.4;
    return range;
  }
  if (test === "82374") { /* Carbon Dioxide */
    range.low = 25.0;
    range.high = 28.0;
    return range;
  }
  if (test === "82435") { /* Chloride */
    range.low = 102.0;
    range.high = 105.0;
    return range;
  }
  if (test === "83735") { /* Magnesium */
    range.low = 2.0;
    range.high = 2.3;
    return range;
  }
  if (test === "82310") { /* Calcium */
    range.low = 9.4;
    range.high = 9.8;
    return range;
  }
  if (test === "84100") { /* Phosphorus */
    if (gender === "M") {
      range.low = 3.0;
      range.high = 3.5;
      return range;
    }
    if (gender === "F") {
      range.low = 3;
      range.high = 4;
      return range;
    }
  }
  if (test === "84550") { /* Uric Acid */
    if (gender === "M") {
      range.low = 3.7;
      range.high = 5.5;
      return range;
    }
    if (gender === "F") {
      range.low = 3.2;
      range.high = 4.4;
      return range;
    }
  }
  if (test === "84520") { /* BUN */
    range.low = 12.0;
    range.high = 19.0;
    return range;
  }
  if (test === "82565") { /* Creatinine */
    range.low = 0.9;
    range.high = 1.3;
    return range;
  }
  if (test === "84450") { /* AST */
    if (gender === "M") {
      range.low = 12;
      range.high = 25;
      return range;
    }
    if (gender === "F") {
      range.low = 9;
      range.high = 21;
      return range;
    }
  }
  if (test === "84460") { /* ALT */
    if (gender === "M") {
      range.low = 13;
      range.high = 22;
      return range;
    }
    if (gender === "F") {
      range.low = 10;
      range.high = 19;
      return range;
    }
  }
  if (test === "82977") { /* GGT */
    if (gender === "M") {
      range.low = 12;
      range.high = 24;
      return range;
    }
    if (gender === "F") {
      range.low = 9;
      range.high = 22;
      return range;
    }
  }
  if (test === "83615") { /* Lactate dehydrogenase */
    range.low = 140.0;
    range.high = 175.0;
    return range;
  }
  if (test === "84075") { /* Alkaline Phosphatase */
    range.low = 40.0;
    range.high = 80.0;
    return range;
  }
  if (test === "82247") { /* Bilirubin Total */
    range.low = 0.5;
    range.high = 0.8;
    return range;
  }
  if (test === "84155") { /* Protein Total */
    range.low = 6.59;
    range.high = 8.0;
    return range;
  }
  if (test === "82040") { /* Albumin */
    range.low = 4.5;
    range.high = 5.0;
    return range;
  }
  if (test === "Globulin") { /* Globulin */
    range.low = 1.9;
    range.high = 3.0;
    return range;
  }
  if (test === "85041") { /* RBC */
    if (gender === "M") {
      range.low = 4.8;
      range.high = 5.5;
      return range;
    }
    if (gender === "F") {
      range.low = 4.3;
      range.high = 4.8;
      return range;
    }
  }
  if (test === "85018") { /* Hemoglobin */
    if (gender === "M") {
      range.low = 13;
      range.high = 16;
      return range;
    }
    if (gender === "F") {
      range.low = 13;
      range.high = 14;
      return range;
    }
  }
  if (test === "85014") { /* Hematocrit */
    if (gender === "M") {
      range.low = 44;
      range.high = 49;
      return range;
    }
    if (gender === "F") {
      range.low = 35;
      range.high = 42;
      return range;
    }
  }
  if (test === "MCV") { /* MCV */
    range.low = 84.0;
    range.high = 90.0;
    return range;
  }
  if (test === "MCH") { /* MCH */
    range.low = 28.0;
    range.high = 32.0;
  }
  if (test === "MCHC") { /* MCHC */
    range.low = 33.0;
    range.high = 35.0;
    return range;
  }
  if (test === "RDW") { /* RDW */
    range.low = 0.0;
    range.high = 13.0;
    return range;
  }
  if (test === "85048") { /* WBC */
    range.low = 3.5;
    range.high = 6.0;
    return range;
  }
  if (test === "Neut%") { /* Neutrophils % */
    range.low = 50.0;
    range.high = 60.0;
    return range;
  }
  if (test === "Lymph%") { /* Lymphocytes % */
    range.low = 30.0;
    range.high = 35.0;
    return range;
  }
  if (test === "Mono%") { /* Monocytes % */
    range.low = 0.0;
    range.high = 7.0;
    return range;
  }
  if (test === "Eos%") { /* Eosinophil % */
    range.low = 0.0;
    range.high = 3.0;
    return range;
  }
  if (test === "Baso%") { /* Basophil % */
    range.low = 0.0;
    range.high = 1.0;
    return range;
  }
  if (test === "85049") { /* Platelets */
    range.low = 225.0;
    range.high = 275.0;
    return range;
  }
  if (test === "83540") { /* Iron */
    range.low = 80.0;
    range.high = 100.0;
    return range;
  }
  if (test === "82728") { /* Ferritin */
    if (gender === "M") {
      range.low = 75;
      range.high = 150;
      return range;
    }
    if (gender === "F") {
      if (age <= 50) { /* later change age 50 to pre and post menopause */
        range.low = 75;
        range.high = 150;
        return range;
      }
      if (age > 50) {
        range.low = 50;
        range.high = 125;
        return range;
      }
    }
  }
  if (test === "83550") { /* TIBC */
    if (gender === "M") {
      range.low = 250;
      range.high = 370;
      return range;
    }
    if (gender === "F") {
      range.low = 250;
      range.high = 315;
      return range;
    }
  }
  if (test === "TS%") { /* Iron Saturation */
    range.low = 24.0;
    range.high = 35.0;
    return range;
  }
  if (test === "84378") { /* GlycoMark */
    range.low = 15.0;
    range.high = 30.0;
    return range;
  }
  if (test === "UIBC") { /* UIBC */
    range.low = 155.0;
    range.high = 355.0;
    return range;
  }
  if (test === "BUNCR") { /* BUN/Creatinine Ratio */
    range.low = 13.0;
    range.high = 20.0;
    return range;
  }
  if (test === "82565") { /* eGFR */
    range.low = 59.0;
    range.high = 127.0;
    return range;
  }
  if (test === "ANIONGAP") { /* Anion Gap */
    range.low = 7.0;
    range.high = 12.0;
    return range;
  }
  if (test === "AGRatio") { /* Albumin/Globulin Ratio */
    range.low = 1.5;
    range.high = 2.0;
    return range;
  }
  if (test === "84443") { /* TSH */
    range.low = 1.8;
    range.high = 3.0;
    return range;
  }
  if (test === "84480") { /* T3 Total */
    range.low = 100;
    range.high = 180;
    return range;
  }
  if (test === "84481") { /* T3 Free */
    range.low = 3.0;
    range.high = 4.0;
    return range;
  }
  if (test === "84436") { /* T4 Total */
    range.low = 6.0;
    range.high = 12.0;
    return range;
  }
  if (test === "84439") { /* T4 Free */
    range.low = 1.0;
    range.high = 1.5;
    return range;
  }
  if (test === "84479") { /* T3 Uptake */
    range.low = 28.0;
    range.high = 38.0;
    return range;
  }
  if (test === "86800") { /* Thyroglobulin Ab */
    range.low = 0.0;
    range.high = 32.0;
    return range;
  }
  if (test === "86376") { /* Thyroid Peroxidase Ab */
    range.low = 0.0;
    range.high = 15.0;
    return range;
  }
  if (test === "84482") { /* T3 Reverse */
    range.low = 9.0;
    range.high = 33.0;
    return range;
  }
  if (test === "FT4I") { /* Free T4 Index (T7) */
    range.low = 1.2;
    range.high = 4.9;
    return range;
  }
  if (test === "82306") { /* Vitamin D 25 Hydroxy */
    range.low = 50.0;
    range.high = 100.0;
    return range;
  }
  if (test === "86141") { /* C-Reactive Protein */
    range.low = 0.0;
    range.high = 1.0;
    return range;
  }
  if (test === "83090") { /* Homocysteine */
    range.low = 0.0;
    range.high = 7.0;
    return range;
  }
  if (test === "84255") { /* Selenium */
    range.low = 100.0;
    range.high = 140.0;
    return range;
  }
  if (test === "Osmolarity") { /* Calculated */
    range.low = 288;
    range.high = 292;
    return range;
  }
  if (test === "ViscosityHighShear") { /* Calculated */
    if (gender === "M") {
      range.low = 15.3;
      range.high = 19.1;
      return range;
    }
    if (gender === "F") {
      range.low = 14.7;
      range.high = 18.3;
      return range;
    }
  }
  if (test === "AnionGapNaClHCO3") { /* Calculated */
    range.low = 7;
    range.high = 12;
    return range;
  }
  if (test === "UrineSG") { /* Urine Specific Gravity */
    range.low = "1.005";
    range.high = "1.025";
    return range;
  }
  if (test === "RHR") { /* resting heart rate */
    if (age >= 19 && age <= 25) {
      if (gender === "F") {
        range.low = 54;
        range.high = 78;
        return range;
      }
      if (gender === "M") {
        range.low = 49;
        range.high = 73;
        return range;
      }
    }
    if (age >= 26 && age <= 35) {
      if (gender === "F") {
        range.low = 54;
        range.high = 76;
        return range;
      }
      if (gender === "M") {
        range.low = 49;
        range.high = 74;
        return range;
      }
    }
    if (age >= 36 && age <= 45) {
      if (gender === "F") {
        range.low = 54;
        range.high = 78;
        return range;
      }
      if (gender === "M") {
        range.low = 50;
        range.high = 75;
        return range;
      }
    }
    if (age >= 46 && age <= 55) {
      if (gender === "F") {
        range.low = 54;
        range.high = 77;
        return range;
      }
      if (gender === "M") {
        range.low = 50;
        range.high = 76;
        return range;
      }
    }
    if (age >= 56 && age <= 65) {
      if (gender === "F") {
        range.low = 54;
        range.high = 77;
        return range;
      }
      if (gender === "M") {
        range.low = 51;
        range.high = 75;
        return range;
      }
    }
    if (age >= 65 && age <= 99) {
      if (gender === "F") {
        range.low = 54;
        range.high = 76;
        return range;
      }
      if (gender === "M") {
        range.low = 50;
        range.high = 73;
        return range;
      }
    }
  }
  return true;
}


export function calculatePercentageFlag(rangeLow, rangeHigh, lastValue) {
  let percentage = "";
  if (lastValue < rangeLow) {
    const percentValue = Math.abs(Number(((lastValue / rangeLow) * 100) - 100).toFixed(1));
    percentage = `Low ${percentValue}%`;
  }
  if (lastValue > rangeHigh) {
    const percentValue = Math.abs(Number(((lastValue / rangeHigh) * 100) - 100).toFixed(1));
    percentage = `High ${percentValue}%`;
  }
  return percentage;
}
