// Punctured Kakeya sets in F_q^2: sets containing all but at most one point of some line in every direction.
// For q+1 lines (one per direction) with union U and multiplicities m_P, |U| = C(q+1,2) + E, E = sum C(m_P-1,2),
// and the best puncturing removes nu points, nu = matching number of the hypergraph (vertices = lines, edges = points).
// We enumerate all configurations (first two lines fixed by translation) and report min |U| - nu, min E, and extremal data.
const q = Number(process.argv[2] || 5);

// ---- finite field GF(q) for q in {2,3,4,5,7,8,9,11,13} ----
function makeField(q) {
  const add = [], mul = [];
  const prime = [2, 3, 5, 7, 11, 13].includes(q);
  if (prime) {
    for (let a = 0; a < q; a++) { add.push([]); mul.push([]); for (let b = 0; b < q; b++) { add[a].push((a + b) % q); mul[a].push((a * b) % q); } }
    return { add, mul };
  }
  // q = p^k with elements as base-p digit vectors; polynomial modulus
  const cfg = { 4: { p: 2, k: 2, mod: [1, 1, 1] }, 8: { p: 2, k: 3, mod: [1, 1, 0, 1] }, 9: { p: 3, k: 2, mod: [1, 0, 1] } }[q];
  const { p, k, mod } = cfg;
  const toVec = (a) => { const v = []; for (let i = 0; i < k; i++) { v.push(a % p); a = Math.floor(a / p); } return v; };
  const toInt = (v) => v.reduce((s, d, i) => s + d * p ** i, 0);
  for (let a = 0; a < q; a++) {
    add.push([]); mul.push([]);
    const va = toVec(a);
    for (let b = 0; b < q; b++) {
      const vb = toVec(b);
      add[a].push(toInt(va.map((d, i) => (d + vb[i]) % p)));
      // polynomial multiplication then reduction modulo mod (monic, degree k)
      const prod = Array(2 * k - 1).fill(0);
      for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) prod[i + j] = (prod[i + j] + va[i] * vb[j]) % p;
      for (let d = 2 * k - 2; d >= k; d--) { const c = prod[d]; if (c) { for (let i = 0; i <= k; i++) prod[d - k + i] = ((prod[d - k + i] - c * mod[i]) % p + p) % p; } }
      mul[a].push(toInt(prod.slice(0, k)));
    }
  }
  return { add, mul };
}
const F = makeField(q);
const N = q * q, D = q + 1;

// lines[dir][b] = array of point indices (x*q+y); dir s in 0..q-1 is direction (1,s): {(t, b + s t)}; dir q is (0,1): {(b, t)}
const lines = [];
for (let s = 0; s < q; s++) { const L = []; for (let b = 0; b < q; b++) { const pts = []; for (let t = 0; t < q; t++) pts.push(t * q + F.add[b][F.mul[s][t]]); L.push(pts); } lines.push(L); }
{ const L = []; for (let b = 0; b < q; b++) { const pts = []; for (let t = 0; t < q; t++) pts.push(b * q + t); L.push(pts); } lines.push(L); }

// ---- matching number of the hypergraph on D lines given the multiplicity data ----
// edges: for each point P in U, the bitmask of lines through it. Exact DP over subsets.
function matchingNumber(edgeMasks) {
  const full = (1 << D) - 1;
  const byLow = Array.from({ length: D }, () => []);
  for (const e of edgeMasks) { let v = 0; while (!((e >> v) & 1)) v++; byLow[v].push(e); }
  // dp over masks: dp[mask] = max number of disjoint edges inside mask
  const dp = new Int8Array(1 << D);
  for (let mask = 1; mask <= full; mask++) {
    let v = 0; while (!((mask >> v) & 1)) v++;
    let best = dp[mask & ~(1 << v)];               // skip line v
    for (const e of byLow[v]) if ((e & mask) === e) { const c = 1 + dp[mask & ~e]; if (c > best) best = c; }
    dp[mask] = best;
  }
  return dp[full];
}

// ---- enumeration ----
const choice = Array(D).fill(0);
const cnt = new Int32Array(N);
const pmask = new Int32Array(N);
let size = 0;
let best = Infinity, bestE = Infinity, bestData = null, minEData = null, count = 0;
const hist = new Map();

function evaluate() {
  count++;
  // multiplicities
  let E = 0, s = 0;
  const edgeMasks = [];
  const lineHasSimple = Array(D).fill(false);
  for (let P = 0; P < N; P++) {
    const m = cnt[P];
    if (m === 0) continue;
    if (m >= 3) E += ((m - 1) * (m - 2)) / 2;
    const mask = pmask[P];
    if (m === 1) { let v = 0; while (!((mask >> v) & 1)) v++; lineHasSimple[v] = true; }
    edgeMasks.push(mask);
  }
  for (let d = 0; d < D; d++) if (lineHasSimple[d]) s++;
  const U = size;
  if (E < bestE) { bestE = E; minEData = { U, E, s, choice: choice.slice() }; }
  const cheap = U - Math.floor((D + s) / 2);
  if (cheap >= best) return;
  const nu = matchingNumber(edgeMasks);
  const val = U - nu;
  const key = `${val}`; hist.set(key, (hist.get(key) || 0) + 1);
  if (val < best) { best = val; bestData = { U, E, s, nu, choice: choice.slice() }; }
}

function rec(d) {
  if (d === D) { evaluate(); return; }
  if (size - D >= best) return;                    // |K'| >= |U| - (q+1)
  const range = (d === 0 || d === D - 1) ? [0] : [...Array(q).keys()];   // fix lines in directions (1,0) and (0,1) by translation
  for (const b of range) {
    choice[d] = b;
    const pts = lines[d][b];
    for (const P of pts) { if (cnt[P]++ === 0) size++; pmask[P] |= 1 << d; }
    rec(d + 1);
    for (const P of pts) { if (--cnt[P] === 0) size--; pmask[P] &= ~(1 << d); }
  }
}
const t0 = Date.now();
rec(0);
const C2 = (q * (q + 1)) / 2;
console.log(`q=${q}: configurations evaluated=${count}, time=${Date.now() - t0} ms`);
console.log(`  min Kakeya |U| = ${C2 + bestE} = C(q+1,2)+${bestE}   [Blokhuis–Mazzocca: ${q % 2 ? (q * q + 2 * q - 1) / 2 : C2} ]`);
console.log(`  min punctured |K'| = ${best}   floor(q^2/2)=${Math.floor(q * q / 2)}   Dvir C(q,2)=${(q * (q - 1)) / 2}`);
console.log(`  extremal: |U|=${bestData.U}, E=${bestData.E}, s=${bestData.s}, nu=${bestData.nu}, choice=${bestData.choice.join(",")}`);
console.log(`  histogram of |K'| values (only for configs passing the cheap bound): ${[...hist.entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => k + ":" + v).join(" ")}`);
