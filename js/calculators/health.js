/* Health calculators. Add a new one by adding an item inside C.push(...). */
C.push(
{g: 'Health', id: 'bmi', t: 'BMI calculator', d: 'Body mass index from your weight and height.',
 F: [fn('w', 'Weight (kg)', 70), fn('h', 'Height (cm)', 170)],
 R: v => {const b = v.w / Math.pow(v.h / 100, 2); return [['Your BMI', nf(b, 1), 1], ['Category', b < 18.5 ? 'Underweight' : b < 25 ? 'Normal weight' : b < 30 ? 'Overweight' : 'Obese']];},
 N: 'WHO adult categories. BMI is a screening guide and does not suit children, pregnancy or athletes with high muscle mass.'},

{g: 'Health', id: 'bmr', t: 'Calorie and BMR calculator', d: 'Daily calories your body needs at rest and with activity.',
 F: [fs('s', 'Sex', SEX, 'm'), fn('a', 'Age (years)', 30), fn('w', 'Weight (kg)', 70), fn('h', 'Height (cm)', 170),
     fs('x', 'Activity level', [[1.2, 'Little or no exercise'], [1.375, 'Light (1-3 days/week)'], [1.55, 'Moderate (3-5 days/week)'], [1.725, 'Hard (6-7 days/week)'], [1.9, 'Very hard / physical job']], 1.375)],
 R: v => {const bmr = 10 * v.w + 6.25 * v.h - 5 * v.a + (v.s == 'm' ? 5 : -161), t = bmr * +v.x, k = x => nf(x, 0) + ' kcal/day';
   return [['BMR (at rest)', k(bmr)], ['Maintain weight', k(t), 1], ['Lose weight (about 500 less)', k(t - 500)], ['Gain weight (about 500 more)', k(t + 500)]];},
 N: 'Mifflin-St Jeor equation. Talk to a doctor or dietitian before major diet changes.'},

{g: 'Health', id: 'ideal', t: 'Ideal weight calculator', d: 'A healthy weight range for your height.',
 F: [fs('s', 'Sex', SEX, 'm'), fn('h', 'Height (cm)', 170)],
 R: v => {const inch = v.h / 2.54, dev = Math.max(0, (v.s == 'm' ? 50 : 45.5) + 2.3 * (inch - 60)), q = Math.pow(v.h / 100, 2);
   return [['Healthy range (BMI 18.5-24.9)', nf(18.5 * q, 1) + ' - ' + nf(24.9 * q, 1) + ' kg', 1], ['Devine formula', nf(dev, 1) + ' kg']];},
 N: 'The Devine formula is a rough estimate, so treat the BMI-based range as the main guide.'},

{g: 'Health', id: 'fat', t: 'Body fat calculator', d: 'Estimate body fat percentage from tape measurements (US Navy method).',
 F: [fs('s', 'Sex', SEX, 'm'), fn('h', 'Height (cm)', 170), fn('ne', 'Neck (cm)', 37), fn('wa', 'Waist (cm)', 85), fn('hi', 'Hip (cm, women only)', 95, {opt: 1})],
 R: v => {const L = Math.log10; let bf;
   if (v.s == 'm') {if (v.wa <= v.ne) return 'Waist must be larger than neck.'; bf = 495 / (1.0324 - .19077 * L(v.wa - v.ne) + .15456 * L(v.h)) - 450;}
   else {if (v.wa + v.hi <= v.ne) return 'Waist plus hip must be larger than neck.'; bf = 495 / (1.29579 - .35004 * L(v.wa + v.hi - v.ne) + .221 * L(v.h)) - 450;}
   return [['Estimated body fat', nf(bf, 1) + '%', 1]];},
 N: 'An estimate only. Measure at the widest hip and the narrowest waist.'},

{g: 'Health', id: 'due', t: 'Pregnancy due date calculator', d: 'Estimated due date from the first day of your last period.',
 F: [fdt('l', 'First day of last period', 'today'), fn('c', 'Cycle length (days)', 28)],
 R: v => {const edd = new Date(D(v.l).getTime() + (280 + (v.c - 28)) * DAY), days = Math.round((D(today) - D(v.l)) / DAY);
   return [['Estimated due date', fd(edd), 1], ['Pregnancy today', days >= 0 && days <= 294 ? Math.floor(days / 7) + ' weeks ' + days % 7 + ' days' : 'Not applicable']];},
 N: 'Naegele\'s rule estimate. Only a doctor can confirm your due date.'}
);
