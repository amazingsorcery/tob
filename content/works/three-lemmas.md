# Three Lemmas

## The Polynomial Method in Combinatorics, from the Nullstellensatz to Cap Sets

*A dissertation in mathematics*

---

### Abstract

The polynomial method proves combinatorial bounds by encoding a finite configuration as the zero set of a low-degree polynomial and then exploiting the tension between two facts: a nonzero polynomial of low degree has few zeros, and a polynomial vanishing on a large set must have high degree. In the last fifteen years the method has settled several problems that had resisted other techniques, among them the finite-field Kakeya problem (Dvir 2009), the joints problem (Guth and Katz 2010), and the cap-set problem (Croot, Lev, and Pach 2017; Ellenberg and Gijswijt 2017), and it underlies the earlier Combinatorial Nullstellensatz of Alon (1999) and its applications in additive number theory.

This dissertation isolates three elementary lemmas, a *counting* lemma (a linear space of polynomials of dimension greater than the number of imposed conditions contains a nonzero solution), a *zeros* lemma (a nonzero polynomial of degree $d$ has at most $d|S|^{n-1}$ zeros on a grid $S^n$, counted with multiplicity), and a *rank* lemma (a matrix whose entries are values of a low-degree polynomial in $\mathbf x+\mathbf y$ has low rank), and derives from them, with complete proofs and explicit constants, the principal theorems of the subject: the Combinatorial Nullstellensatz; the Cauchy–Davenport theorem; the Alon–Nathanson–Ruzsa theorem and the Erdős–Heilbronn conjecture; Chevalley–Warning and Erdős–Ginzburg–Ziv; Dvir's Kakeya bound $|K|\ge\binom{q+n-1}{n}$ and the Dvir–Kopparty–Saraf–Sudan bound $|K|\ge (q^2/(2q-1))^n$; the joints theorem in every dimension over every field, with the constant $(2\,(n!)^{1/n})^{n/(n-1)}$; and the Ellenberg–Gijswijt bound $|A|\le 3\cdot(2.7552)^n$ for cap sets in $\mathbb F_3^n$, with the exact value of the constant.

The dissertation's contribution is mainly one of synthesis and verification. Each proof is traced to the lemma it uses; a layer of multiplicity (Hasse derivatives) is developed once and used in both the Kakeya and the zeros arguments; and every bound is checked against exhaustive computation in small cases, where the polynomial bounds are compared with the true extremal values. One result is new: the minimum size of a *punctured* Kakeya set in the plane, a set containing all but at most one point of some line in every direction, is $(q^2-1)/2$ for every odd $q$, and lies between $q^2/2-\lceil(q+1)/6\rceil$ and $q^2/2-1$ for even $q$, with the upper value attained for $q=4$ and $q=8$. The proof reduces the problem to a matching problem on the lines and uses the Blokhuis–Mazzocca classification of minimal Kakeya sets; it shows that the polynomial method, which gives $\binom q2$, falls short of the truth in the plane by exactly $(q-1)/2$. The penultimate chapter marks the limits of the three lemmas and states the open problems that lie beyond them.

---

### Contents

1. Introduction
2. Three Lemmas
3. Sums of Residues
4. Kakeya Sets over Finite Fields
5. Joints
6. Cap Sets
7. A New Result: Punctured Kakeya Sets in the Plane
8. Scope and Limits
9. Conclusion
Appendix A. Computations
Bibliography

---

### Notation

$\mathbb F$ is a field, $\mathbb F_q$ the field with $q$ elements ($q$ a prime power, $p$ its characteristic), $\mathbb Z_p=\mathbb F_p$ for $p$ prime. $\mathbb F[\mathbf x]=\mathbb F[x_1,\dots,x_n]$. For $\boldsymbol\alpha\in\mathbb N^n$ write $\mathbf x^{\boldsymbol\alpha}=x_1^{\alpha_1}\cdots x_n^{\alpha_n}$ and $|\boldsymbol\alpha|=\alpha_1+\dots+\alpha_n$; $\boldsymbol\beta\le\boldsymbol\alpha$ means $\beta_i\le\alpha_i$ for all $i$, and $\binom{\boldsymbol\alpha}{\boldsymbol\beta}=\prod_i\binom{\alpha_i}{\beta_i}$. The *degree* of a polynomial is its total degree; $P_d$ denotes the homogeneous part of $P$ of degree $d$. For $S\subseteq\mathbb F$, $S^n$ is the grid $S\times\dots\times S$. $[N]=\{1,\dots,N\}$. For $A,B\subseteq\mathbb Z_p$, $A+B=\{a+b\}$ and $A\mathbin{\hat+}B=\{a+b: a\in A,\ b\in B,\ a\ne b\}$. Logarithms are natural. Theorems, lemmas, and equations are numbered by chapter.
# Chapter 1. Introduction

## 1.1 The method

A polynomial in one variable of degree $d$ over a field has at most $d$ roots. This is the first nontrivial fact one learns about polynomials, and it is also, suitably generalised, the engine of one of the most productive techniques in modern combinatorics.

The technique works by contradiction. One wishes to show that a finite configuration, a set of points, lines, or residues, cannot be too small or too large. One supposes otherwise, and uses the supposed size to find a nonzero polynomial of unexpectedly low degree that vanishes on the configuration; this step is pure linear algebra, since vanishing at a point is a linear condition on coefficients. One then uses the structure of the configuration, the fact that it contains lines, or sums, or arithmetic progressions, to show that the polynomial must vanish on a much larger set than the configuration itself, indeed on so large a set that a polynomial of that degree cannot vanish there without being identically zero. The contradiction bounds the size of the configuration.

The method has an old history. Chevalley (1935) and Warning (1935) used the vanishing of power sums over a finite field to show that a system of polynomial equations in more variables than the sum of its degrees has a number of solutions divisible by the characteristic. Alon (1999), drawing on work with Tarsi (Alon and Tarsi 1992) and with Nathanson and Ruzsa in the preceding decade, formulated the *Combinatorial Nullstellensatz*, a statement about which polynomials can vanish on a product of finite sets, and showed that it gave short proofs of the Cauchy–Davenport theorem, of the Erdős–Heilbronn conjecture (first proved by Dias da Silva and Hamidoune in 1994 by other means), of Chevalley–Warning, and of results in graph colouring. But the method's standing changed in 2008, when Dvir (2009) proved in two pages a conjecture of Wolff (1999) on the size of Kakeya sets over finite fields, a problem that had resisted a decade of work by harmonic analysts. Within two years Guth and Katz (2010) had used a refinement of Dvir's idea to settle the joints problem and, with the further tool of polynomial partitioning, the Erdős distinct-distances problem (Guth and Katz 2015). Dvir, Kopparty, Saraf, and Sudan (2013) sharpened the Kakeya bound by requiring the polynomial to vanish to high order. And in 2016 Croot, Lev, and Pach (2017) and then Ellenberg and Gijswijt (2017) found that a variant of the method bounded the size of cap sets in $\mathbb F_3^n$ exponentially, a problem on which the best bound had for twenty years been only slightly better than trivial.

These results are usually presented separately, each with its own apparatus. The premise of this dissertation is that they share a common core, and that the core consists of three lemmas that can be stated and proved in a few pages of elementary algebra.

## 1.2 Three lemmas

The three lemmas are the following. Precise statements and proofs occupy Chapter 2.

**The counting lemma.** Let $V$ be a linear space of polynomials of dimension $N$, and let $A$ be a finite set of points at each of which we impose $c$ linear conditions (vanishing, or vanishing together with all derivatives up to a given order). If $c|A|<N$, some nonzero member of $V$ satisfies all the conditions. The space of polynomials of degree at most $d$ in $n$ variables has dimension $\binom{d+n}{n}$; vanishing to order $m$ at a point imposes $\binom{m+n-1}{n}$ conditions.

**The zeros lemma.** A nonzero polynomial of degree $d$ in $n$ variables has at most $d|S|^{n-1}$ zeros on the grid $S^n$, and this remains true when zeros are counted with multiplicity. A closely related statement, the Combinatorial Nullstellensatz, says that a polynomial cannot vanish on a product $S_1\times\dots\times S_n$ if it has a monomial $x_1^{t_1}\cdots x_n^{t_n}$ of maximal degree with nonzero coefficient and $|S_i|>t_i$ for each $i$.

**The rank lemma.** If $P$ is a polynomial of degree at most $d$ in $n$ variables, then for any finite set $A\subseteq\mathbb F^n$ the matrix $(P(\mathbf x+\mathbf y))_{\mathbf x,\mathbf y\in A}$ has rank at most twice the number of monomials of degree at most $d/2$. This is because each monomial in the expansion of $P(\mathbf x+\mathbf y)$ has low degree in $\mathbf x$ or low degree in $\mathbf y$.

The first lemma finds the polynomial; the second and third say what a polynomial cannot do. Every theorem in this dissertation is a combination of the first with one of the other two, with the specific geometry or arithmetic of the problem supplying the bridge between them. The following table records the pattern.

| Theorem | Counting | Zeros | Rank | Bridge |
|---|---|---|---|---|
| Combinatorial Nullstellensatz | | ✓ | | reduction modulo $\prod_{s\in S_i}(x_i-s)$ |
| Cauchy–Davenport; Alon–Nathanson–Ruzsa; Erdős–Heilbronn | | ✓ | | a product $\prod_c(x+y-c)$ over the sumset |
| Chevalley–Warning; Erdős–Ginzburg–Ziv | | ✓ (power sums) | | the indicator $\prod(1-f_i^{q-1})$ |
| Dvir's Kakeya bound | ✓ | ✓ | | restriction to lines; the top homogeneous part |
| Dvir–Kopparty–Saraf–Sudan | ✓ (multiplicity) | ✓ (multiplicity) | | Hasse derivatives along lines |
| Joints | ✓ | ✓ (univariate) | | the gradient at a joint |
| Ellenberg–Gijswijt | ✓ | | ✓ | the diagonal matrix $P(\mathbf x+\mathbf y)$ on a cap set |

## 1.3 Main theorems

For definiteness, the theorems proved in full are the following. In each case the statement is the one in the literature, and where the argument here yields an explicit constant it is stated.

**Theorem A (Alon 1999).** *Let $P\in\mathbb F[x_1,\dots,x_n]$ have degree $t_1+\dots+t_n$ with the coefficient of $x_1^{t_1}\cdots x_n^{t_n}$ nonzero, and let $S_i\subseteq\mathbb F$ with $|S_i|>t_i$. Then $P$ does not vanish identically on $S_1\times\dots\times S_n$.*

**Theorem B (Cauchy 1813; Davenport 1935; Alon–Nathanson–Ruzsa 1996; Dias da Silva–Hamidoune 1994).** *Let $p$ be prime and $A,B\subseteq\mathbb Z_p$ nonempty with $|A|=k$, $|B|=l$. Then $|A+B|\ge\min(p,k+l-1)$; if $k\ne l$ then $|A\mathbin{\hat+}B|\ge\min(p,k+l-2)$; and if $k\ge2$ then $|A\mathbin{\hat+}A|\ge\min(p,2k-3)$.*

**Theorem C (Chevalley 1935; Warning 1935; Erdős–Ginzburg–Ziv 1961).** *If $f_1,\dots,f_r\in\mathbb F_q[x_1,\dots,x_n]$ satisfy $\sum\deg f_i<n$, the number of common zeros is divisible by $p$. Consequently any $2n-1$ integers contain $n$ whose sum is divisible by $n$.*

**Theorem D (Dvir 2009; Dvir–Kopparty–Saraf–Sudan 2013).** *A Kakeya set $K\subseteq\mathbb F_q^n$ satisfies $|K|\ge\binom{q+n-1}{n}$ and $|K|\ge\big(q^2/(2q-1)\big)^n$.*

**Theorem E (Guth–Katz 2010; Kaplan–Sharir–Shustin 2010; Quilodrán 2010; Carbery–Iliopoulou 2014).** *Over any field, $L$ lines in $n$-space determine at most $\big(2\,(n!)^{1/n}\big)^{n/(n-1)}L^{n/(n-1)}$ joints. For $n=3$ the constant is $\sqrt{48}<6.93$.*

**Theorem F (Ellenberg–Gijswijt 2017).** *A subset of $\mathbb F_3^n$ containing no three distinct collinear points has at most $3\,m_{\lfloor 2n/3\rfloor}\le 3c^n$ elements, where $m_D$ is the number of $\boldsymbol\alpha\in\{0,1,2\}^n$ with $|\boldsymbol\alpha|\le D$ and*
$$c=\frac{1+t_0+t_0^2}{t_0^{2/3}},\qquad t_0=\frac{\sqrt{33}-1}{8},\qquad c=2.755105\ldots$$

**Theorem G (new; Chapter 7).** *Call $K\subseteq\mathbb F_q^2$ a punctured Kakeya set if for every direction some line in that direction has at most one point outside $K$, and let $\kappa^-(q)$ be the least size of such a set. Then $\kappa^-(q)=(q^2-1)/2$ for every odd $q\ge3$; and for even $q\ge4$, $q^2/2-\lceil(q+1)/6\rceil\le\kappa^-(q)\le q^2/2-1$, with equality on the right for $q=4,8$.*

## 1.4 Contributions and provenance

This is, in the main, a dissertation of synthesis. None of the theorems A to F is new, and each is attributed to its authors where it is stated. Theorem G is new to the best of my knowledge, and Chapter 7 says exactly what it depends on. What the dissertation claims to add is the following.

First, an *architecture*. The three lemmas of §1.2 are isolated, proved once in their sharpest elementary forms, and used without further apparatus. The layer of multiplicity, Hasse derivatives and the multiplicity version of the zeros lemma, is developed in §2.3 and §2.5 and then used verbatim in the Kakeya argument of Chapter 4. A reader who has understood Chapter 2 has, I claim, understood everything that is not problem-specific in Chapters 3 to 6.

Second, *complete proofs with explicit constants*. The published proofs of Theorems D, E, and F are short and, in places, compressed. The proofs here are longer and, I hope, leave nothing to the reader; where a constant appears, the argument is carried through to an explicit value, and where a choice of parameter is made (the degree in the cap-set argument, the multiplicity in the Kakeya argument) the choice is optimised in the text.

Third, *verification*. Every bound in the dissertation has been compared with exhaustive computation in the smallest cases: the minimum sizes of sumsets and restricted sumsets in $\mathbb Z_p$ for $p\le17$; the Erdős–Ginzburg–Ziv theorem for $n\le9$; the minimum size of a Kakeya set in $\mathbb F_q^2$ for $q\le7$; the maximum size of a cap set in $\mathbb F_3^n$ for $n\le3$; and the numerical values of the Ellenberg–Gijswijt bound for $n\le12$. The computations are described in Appendix A and their outputs are reproduced there. They confirm the theorems, which was never in doubt, but more usefully they show how far each polynomial bound is from the truth in small cases, which is the beginning of an understanding of where the method is sharp and where it is not.

Fourth, a few *corollaries and remarks* that I have not seen stated in the form given here: the version of Theorem D for sets containing only a fraction of each line, with the multiplicity method (Corollary 4.8); the form of the joints theorem over an arbitrary field via the Frobenius map (Theorem 5.4, which follows Carbery and Iliopoulou); and the per-degree form of the cap-set bound in Theorem 6.5, which is slightly sharper than the usual statement in small dimensions. I make no claim that these are new; I claim only that I have not found them stated in this way, and a reader who knows the literature better will correct me.

Fifth, *one new theorem*. Chapter 7 determines the minimum size of a punctured Kakeya set in the plane, a set containing all but at most one point of some line in every direction, exactly for odd $q$ and up to an additive $\lceil(q+1)/6\rceil$ for even $q$ (Theorem G). The proof is not by the polynomial method, which gives only $\binom q2$; it is by inclusion–exclusion sharpened by a matching argument, and for odd $q$ it uses the Blokhuis–Mazzocca classification of minimal Kakeya sets. The chapter is therefore also a measurement: it shows that in the plane the polynomial method falls short of the truth by exactly $(q-1)/2$ for this variant, as it does for the original problem. The result was found by computation, proved afterwards, and checked against a literature search whose results are reported in the chapter; I have not found it elsewhere, but the search was mine and not a referee's.

I have tried to be scrupulous about what is proved and what is cited. Every result stated without proof is marked as such and attributed.

## 1.5 Outline

Chapter 2 develops the three lemmas, together with Hasse derivatives and multiplicity. Chapter 3 applies the zeros lemma, in its Nullstellensatz form, to sums of residues, and the power-sum form to Chevalley–Warning and Erdős–Ginzburg–Ziv. Chapter 4 proves Dvir's theorem and the Dvir–Kopparty–Saraf–Sudan bound for Kakeya sets, and compares them with the exact results in the plane. Chapter 5 proves the joints theorem in every dimension and over every field. Chapter 6 proves the Ellenberg–Gijswijt bound and determines its constant. Chapter 7 proves Theorem G on punctured Kakeya sets, the dissertation's one new result. Chapter 8 asks what the three lemmas do and do not explain, and lists open problems. Chapter 9 concludes. Appendix A contains the computations.

For the wider subject the reader may consult the surveys of Tao (2014) and Dvir (2012) and the lecture notes of Guth (2016), which cover polynomial partitioning and the Euclidean applications omitted here; for the additive number theory of Chapter 3, Nathanson (1996) and Tao and Vu (2006).
# Chapter 2. Three Lemmas

## 2.1 Polynomials, degree, grids

Throughout, $\mathbb F$ is a field and $\mathbb F[\mathbf x]=\mathbb F[x_1,\dots,x_n]$. A polynomial is a finite linear combination of monomials $\mathbf x^{\boldsymbol\alpha}$; its *degree* $\deg P$ is the largest $|\boldsymbol\alpha|$ with nonzero coefficient, with $\deg 0=-\infty$. $P$ is *homogeneous of degree $d$* if all its monomials have $|\boldsymbol\alpha|=d$, and every $P$ decomposes uniquely as $P=\sum_{k\ge0}P_k$ with $P_k$ homogeneous of degree $k$; $P_{\deg P}$ is the *top homogeneous part*. Two facts about degree are used constantly: $\deg(PQ)=\deg P+\deg Q$, and $\deg(P+Q)\le\max(\deg P,\deg Q)$.

A polynomial defines a function $\mathbb F^n\to\mathbb F$. Over an infinite field the polynomial is determined by the function; over $\mathbb F_q$ it is not, since $x^q-x$ vanishes identically. The following standard facts (Lidl and Niederreiter 1997, ch. 1) dispose of this.

**Lemma 2.1.** *(a) The number of monomials $\mathbf x^{\boldsymbol\alpha}$ in $n$ variables with $|\boldsymbol\alpha|\le d$ is $\binom{d+n}{n}$; hence the space of polynomials of degree at most $d$ has dimension $\binom{d+n}{n}$.*
*(b) Over $\mathbb F_q$, call $P$* reduced *if every exponent in every monomial is at most $q-1$. Every function $\mathbb F_q^n\to\mathbb F_q$ is represented by exactly one reduced polynomial; in particular a reduced polynomial that vanishes on all of $\mathbb F_q^n$ is zero.*

*Proof.* (a) Monomials of degree at most $d$ correspond to solutions of $\alpha_1+\dots+\alpha_n+\alpha_{n+1}=d$ in nonnegative integers, of which there are $\binom{d+n}{n}$. (b) The reduced monomials number $q^n$, as do the functions $\mathbb F_q^n\to\mathbb F_q$, so it suffices to show that the reduced polynomials span the functions. For $\mathbf a\in\mathbb F_q^n$ the polynomial $\delta_{\mathbf a}(\mathbf x)=\prod_{i=1}^n\big(1-(x_i-a_i)^{q-1}\big)$ is reduced and equals $1$ at $\mathbf a$ and $0$ elsewhere, because $t^{q-1}=1$ for $t\ne0$. The $\delta_{\mathbf a}$ span all functions. ∎

For $S\subseteq\mathbb F$ finite, the *grid* $S^n$ is the product set. The lemmas below concern polynomials on grids; the case $S=\mathbb F_q$, $S^n=\mathbb F_q^n$, is the most important.

## 2.2 Counting

**Lemma 2.2 (Counting).** *Let $V$ be a linear space of polynomials in $\mathbb F[\mathbf x]$ of finite dimension $N$, and let $\lambda_1,\dots,\lambda_M:V\to\mathbb F$ be linear functionals with $M<N$. Then there is a nonzero $P\in V$ with $\lambda_j(P)=0$ for all $j$. In particular:*

*(a) If $A\subseteq\mathbb F^n$ and $|A|<\binom{d+n}{n}$, there is a nonzero polynomial of degree at most $d$ vanishing on $A$.*

*(b) If $A\subseteq\mathbb F^n$ and $|A|\binom{m+n-1}{n}<\binom{d+n}{n}$, there is a nonzero polynomial of degree at most $d$ vanishing to order at least $m$ at every point of $A$ (in the sense of Definition 2.4 below).*

*Proof.* The map $P\mapsto(\lambda_1(P),\dots,\lambda_M(P))$ is linear from an $N$-dimensional space to an $M$-dimensional one; since $M<N$ its kernel is nonzero. For (a), take $V$ the polynomials of degree at most $d$ and the functionals $P\mapsto P(\mathbf a)$, $\mathbf a\in A$. For (b), take the functionals $P\mapsto P^{(\mathbf i)}(\mathbf a)$ for $\mathbf a\in A$ and $|\mathbf i|\le m-1$, where $P^{(\mathbf i)}$ is the Hasse derivative of §2.3; each is linear in $P$, and the number of $\mathbf i\in\mathbb N^n$ with $|\mathbf i|\le m-1$ is $\binom{m-1+n}{n}$ by Lemma 2.1(a). ∎

The lemma is trivial, and its triviality is the point: the existence of the polynomial costs nothing. Everything difficult in the method is in showing that the polynomial cannot exist.

## 2.3 Hasse derivatives and multiplicity

Over a field of positive characteristic the ordinary derivative behaves badly: $\frac{d}{dx}x^p=0$. The remedy, due to Hasse (1936), is to define derivatives by Taylor expansion rather than by differentiation.

**Definition 2.3.** For $P\in\mathbb F[\mathbf x]$ the *Hasse derivatives* $P^{(\mathbf i)}\in\mathbb F[\mathbf x]$, $\mathbf i\in\mathbb N^n$, are defined by the identity
$$P(\mathbf x+\mathbf y)=\sum_{\mathbf i\in\mathbb N^n}P^{(\mathbf i)}(\mathbf x)\,\mathbf y^{\mathbf i}\qquad\text{in }\mathbb F[\mathbf x,\mathbf y].$$

Since $(\mathbf x+\mathbf y)^{\boldsymbol\alpha}=\prod_j(x_j+y_j)^{\alpha_j}=\sum_{\mathbf i\le\boldsymbol\alpha}\binom{\boldsymbol\alpha}{\mathbf i}\mathbf x^{\boldsymbol\alpha-\mathbf i}\mathbf y^{\mathbf i}$, one has for monomials
$$(\mathbf x^{\boldsymbol\alpha})^{(\mathbf i)}=\binom{\boldsymbol\alpha}{\mathbf i}\mathbf x^{\boldsymbol\alpha-\mathbf i}\quad(\mathbf i\le\boldsymbol\alpha),\qquad(\mathbf x^{\boldsymbol\alpha})^{(\mathbf i)}=0\quad\text{otherwise},$$
and $P\mapsto P^{(\mathbf i)}$ is linear. $P^{(\mathbf 0)}=P$, and for $|\mathbf i|=1$ the Hasse derivative is the ordinary partial derivative. Over $\mathbb Q$, $P^{(\mathbf i)}=\frac{1}{\mathbf i!}\partial^{\mathbf i}P$; the point of the definition is that it makes sense in every characteristic.

**Definition 2.4.** The *multiplicity* of $P$ at $\mathbf a\in\mathbb F^n$ is
$$\operatorname{mult}(P,\mathbf a)=\min\{|\mathbf i|:P^{(\mathbf i)}(\mathbf a)\ne0\},$$
with $\operatorname{mult}(0,\mathbf a)=\infty$. Equivalently, since $P(\mathbf a+\mathbf y)=\sum_{\mathbf i}P^{(\mathbf i)}(\mathbf a)\mathbf y^{\mathbf i}$, it is the least degree of a monomial occurring in $P(\mathbf a+\mathbf y)$ as a polynomial in $\mathbf y$. Thus $\operatorname{mult}(P,\mathbf a)\ge1$ iff $P(\mathbf a)=0$, and $P$ *vanishes to order $m$* at $\mathbf a$ iff $\operatorname{mult}(P,\mathbf a)\ge m$.

If $P\ne0$ then $P(\mathbf a+\mathbf y)\ne0$ (the substitution $\mathbf x\mapsto\mathbf x+\mathbf a$ is an automorphism of $\mathbb F[\mathbf x]$), so $\operatorname{mult}(P,\mathbf a)$ is finite and at most $\deg P$.

**Lemma 2.5 (Properties of Hasse derivatives).** *Let $P\in\mathbb F[\mathbf x]$.*

*(i) (Composition) $\big(P^{(\mathbf i)}\big)^{(\mathbf j)}=\binom{\mathbf i+\mathbf j}{\mathbf i}P^{(\mathbf i+\mathbf j)}$.*

*(ii) (Degree) $\deg P^{(\mathbf i)}\le\deg P-|\mathbf i|$. If $P$ is homogeneous of degree $d$, then $P^{(\mathbf i)}$ is homogeneous of degree $d-|\mathbf i|$ or zero. Consequently the homogeneous part of $P^{(\mathbf i)}$ of degree $\deg P-|\mathbf i|$ is $(P_{\deg P})^{(\mathbf i)}$.*

*(iii) (Multiplicity of derivatives) If $\operatorname{mult}(P,\mathbf a)\ge m$ then $\operatorname{mult}(P^{(\mathbf i)},\mathbf a)\ge m-|\mathbf i|$.*

*(iv) (Restriction to a line) For $\mathbf a,\mathbf b\in\mathbb F^n$ let $P_{\mathbf a,\mathbf b}(t)=P(\mathbf a+t\mathbf b)\in\mathbb F[t]$. Then for every $t_0\in\mathbb F$, $\operatorname{mult}(P_{\mathbf a,\mathbf b},t_0)\ge\operatorname{mult}(P,\mathbf a+t_0\mathbf b)$.*

*(v) (Univariate multiplicity) For $0\ne P\in\mathbb F[t]$ and $t_0\in\mathbb F$, $\operatorname{mult}(P,t_0)$ is the largest $m$ with $(t-t_0)^m\mid P$, and $\sum_{t_0\in\mathbb F}\operatorname{mult}(P,t_0)\le\deg P$.*

*(vi) (Leading coefficient along a line) If $\deg P\le e$ and $P_e$ is its homogeneous part of degree $e$ (possibly zero), then for all $\mathbf a,\mathbf b$ the coefficient of $t^e$ in $P(\mathbf a+t\mathbf b)$ is $P_e(\mathbf b)$.*

*Proof.* (i) Expand $P(\mathbf x+\mathbf y+\mathbf z)$ in two ways. Grouping as $(\mathbf x+\mathbf y)+\mathbf z$ and then expanding in $\mathbf y$,
$$P(\mathbf x+\mathbf y+\mathbf z)=\sum_{\mathbf j}P^{(\mathbf j)}(\mathbf x+\mathbf y)\mathbf z^{\mathbf j}=\sum_{\mathbf j}\sum_{\mathbf i}\big(P^{(\mathbf j)}\big)^{(\mathbf i)}(\mathbf x)\mathbf y^{\mathbf i}\mathbf z^{\mathbf j}.$$
Grouping as $\mathbf x+(\mathbf y+\mathbf z)$,
$$P(\mathbf x+\mathbf y+\mathbf z)=\sum_{\mathbf k}P^{(\mathbf k)}(\mathbf x)(\mathbf y+\mathbf z)^{\mathbf k}=\sum_{\mathbf k}P^{(\mathbf k)}(\mathbf x)\sum_{\mathbf i+\mathbf j=\mathbf k}\binom{\mathbf k}{\mathbf i}\mathbf y^{\mathbf i}\mathbf z^{\mathbf j}.$$
Comparing coefficients of $\mathbf y^{\mathbf i}\mathbf z^{\mathbf j}$ in $\mathbb F[\mathbf x,\mathbf y,\mathbf z]$ gives $(P^{(\mathbf j)})^{(\mathbf i)}=\binom{\mathbf i+\mathbf j}{\mathbf i}P^{(\mathbf i+\mathbf j)}$, which is (i) with the roles of $\mathbf i,\mathbf j$ exchanged (the binomial is symmetric).

(ii) By linearity it suffices to check monomials, and $(\mathbf x^{\boldsymbol\alpha})^{(\mathbf i)}$ is either zero or a scalar multiple of $\mathbf x^{\boldsymbol\alpha-\mathbf i}$, of degree $|\boldsymbol\alpha|-|\mathbf i|$. The last sentence follows: the monomials of $P^{(\mathbf i)}$ of degree $\deg P-|\mathbf i|$ can only arise from monomials of $P$ of degree $\deg P$.

(iii) By (i), $\big(P^{(\mathbf i)}\big)^{(\mathbf j)}(\mathbf a)=\binom{\mathbf i+\mathbf j}{\mathbf i}P^{(\mathbf i+\mathbf j)}(\mathbf a)$, and if $|\mathbf j|<m-|\mathbf i|$ then $|\mathbf i+\mathbf j|<m$, so $P^{(\mathbf i+\mathbf j)}(\mathbf a)=0$.

(iv) Let $\mathbf x_0=\mathbf a+t_0\mathbf b$ and $m=\operatorname{mult}(P,\mathbf x_0)$. Then
$$P_{\mathbf a,\mathbf b}(t_0+s)=P(\mathbf x_0+s\mathbf b)=\sum_{\mathbf i}P^{(\mathbf i)}(\mathbf x_0)\,s^{|\mathbf i|}\mathbf b^{\mathbf i},$$
and every term with $|\mathbf i|<m$ vanishes, so $s^m$ divides $P_{\mathbf a,\mathbf b}(t_0+s)$ as a polynomial in $s$, which is to say $\operatorname{mult}(P_{\mathbf a,\mathbf b},t_0)\ge m$.

(v) $P(t_0+s)=\sum_i P^{(i)}(t_0)s^i$ has least-degree term $s^m$ with $m=\operatorname{mult}(P,t_0)$, so $P(t_0+s)=s^mQ(s)$ with $Q(0)\ne0$, i.e. $P(t)=(t-t_0)^mQ(t-t_0)$ with $(t-t_0)\nmid Q(t-t_0)$. The divisibility characterisation follows, and since the polynomials $(t-t_0)^{m_{t_0}}$ for distinct $t_0$ are pairwise coprime, their product divides $P$, giving $\sum m_{t_0}\le\deg P$.

(vi) Write $P=\sum_{k\le e}P_k$. For a monomial $\mathbf x^{\boldsymbol\alpha}$ of degree $k$, $(\mathbf a+t\mathbf b)^{\boldsymbol\alpha}=\prod_j(a_j+tb_j)^{\alpha_j}$ is a polynomial in $t$ of degree at most $k$ whose coefficient of $t^k$ is $\mathbf b^{\boldsymbol\alpha}$. Hence $P_k(\mathbf a+t\mathbf b)$ has degree at most $k$ with $t^k$-coefficient $P_k(\mathbf b)$, and the only contribution to $t^e$ comes from $k=e$. ∎

## 2.4 Zeros: Schwartz–Zippel and the Combinatorial Nullstellensatz

**Lemma 2.6 (Schwartz–Zippel).** *Let $0\ne P\in\mathbb F[x_1,\dots,x_n]$ have degree $d$ and let $S\subseteq\mathbb F$ be finite. Then $P$ has at most $d|S|^{n-1}$ zeros in $S^n$.*

*Proof.* Induction on $n$. For $n=1$ this is the statement that a nonzero univariate polynomial of degree $d$ has at most $d$ roots, which is (v) of Lemma 2.5. For $n>1$ write $P=\sum_{j=0}^{t}P_j(x_1,\dots,x_{n-1})x_n^j$ with $P_t\ne0$, so $\deg P_t\le d-t$. For $\mathbf a\in S^{n-1}$: if $P_t(\mathbf a)=0$, count all $|S|$ points $(\mathbf a,b)$ as possible zeros; there are at most $(d-t)|S|^{n-2}$ such $\mathbf a$ by induction, contributing at most $(d-t)|S|^{n-1}$. If $P_t(\mathbf a)\ne0$, the univariate polynomial $P(\mathbf a,x_n)$ has degree exactly $t$ and hence at most $t$ roots, contributing at most $t|S|^{n-1}$ in total. The sum is $d|S|^{n-1}$. ∎

The lemma is attributed to Schwartz (1980) and Zippel (1979), and independently to DeMillo and Lipton (1978). Its most useful special case is $S=\mathbb F_q$ and $d<q$: then $P$ has fewer than $q^n$ zeros, so a nonzero polynomial of degree less than $q$ cannot vanish on all of $\mathbb F_q^n$.

The Combinatorial Nullstellensatz refines the lemma from grids $S^n$ to products $S_1\times\dots\times S_n$ of sets of different sizes, and from total degree to the degrees in each variable.

**Theorem 2.7 (Combinatorial Nullstellensatz; Alon 1999).** *Let $S_1,\dots,S_n\subseteq\mathbb F$ be finite and nonempty, let $t_1,\dots,t_n\ge0$ be integers with $|S_i|\ge t_i+1$, and let $P\in\mathbb F[\mathbf x]$.*

*(a) If $\deg_{x_i}P\le t_i$ for every $i$ and $P$ vanishes on $S_1\times\dots\times S_n$, then $P=0$.*

*(b) If $\deg P=t_1+\dots+t_n$ and the coefficient of $x_1^{t_1}\cdots x_n^{t_n}$ in $P$ is nonzero, then there is $\mathbf a\in S_1\times\dots\times S_n$ with $P(\mathbf a)\ne0$.*

*Proof.* (a) Induction on $n$; the case $n=1$ is Lemma 2.5(v). Write $P=\sum_{j\le t_n}P_j(x_1,\dots,x_{n-1})x_n^j$. For each $\mathbf a\in S_1\times\dots\times S_{n-1}$ the polynomial $P(\mathbf a,x_n)$ has degree at most $t_n$ and vanishes at the $|S_n|\ge t_n+1$ points of $S_n$, so it is zero, i.e. $P_j(\mathbf a)=0$ for all $j$. Thus each $P_j$ vanishes on $S_1\times\dots\times S_{n-1}$ and has $\deg_{x_i}P_j\le t_i$, so $P_j=0$ by induction.

(b) Shrinking the $S_i$ we may assume $|S_i|=t_i+1$. Let $g_i(x_i)=\prod_{s\in S_i}(x_i-s)$, monic of degree $t_i+1$ and vanishing on $S_i$. Suppose $P$ vanishes on $S_1\times\dots\times S_n$. Reduce $P$ as follows: while some monomial $\mathbf x^{\boldsymbol\alpha}$ with nonzero coefficient has $\alpha_i\ge t_i+1$ for some $i$, subtract from $P$ the polynomial $c\,\mathbf x^{\boldsymbol\alpha-(t_i+1)\mathbf e_i}g_i(x_i)$, where $c$ is the coefficient; this removes the monomial $\mathbf x^{\boldsymbol\alpha}$ and introduces monomials $\mathbf x^{\boldsymbol\alpha-(t_i+1)\mathbf e_i}x_i^j$ with $j\le t_i$, all of degree less than $|\boldsymbol\alpha|$. The process terminates (the sum of degrees of offending monomials decreases), it does not change the values of $P$ on the product set (each $g_i$ vanishes there), and it does not change the coefficient of $x_1^{t_1}\cdots x_n^{t_n}$: the removed monomial $\mathbf x^{\boldsymbol\alpha}$ has some $\alpha_i>t_i$ and $|\boldsymbol\alpha|\le\deg P=\sum t_j$, hence is not $x_1^{t_1}\cdots x_n^{t_n}$; and the introduced monomials have degree less than $|\boldsymbol\alpha|\le\sum t_j$, so none of them is $x_1^{t_1}\cdots x_n^{t_n}$ either. The result is a polynomial $\bar P$ with $\deg_{x_i}\bar P\le t_i$, vanishing on the product set, with the same nonzero coefficient of $x_1^{t_1}\cdots x_n^{t_n}$ as $P$; in particular $\bar P\ne0$. This contradicts (a). ∎

Alon's paper gives (a) and (b) as Theorems 1.1 and 1.2 and calls them both the Combinatorial Nullstellensatz; the name refers to Hilbert's Nullstellensatz, of which (a) is a combinatorial analogue for the ideal generated by the $g_i$. Shorter proofs of (b) have since been given by Michałek (2010) and Lasoń (2010); the proof above follows Alon.

Two remarks on the hypothesis of (b). The degree condition $\deg P=\sum t_i$ is essential: it is what guarantees that the reduction cannot create the distinguished monomial. And the condition is about a single monomial of maximal degree, not about $P$ as a whole; $P$ may have many other monomials of the same degree, and it does not matter what they are.

## 2.5 Zeros with multiplicity

**Lemma 2.8 (Multiplicity Schwartz–Zippel; Dvir, Kopparty, Saraf, and Sudan 2013).** *Let $0\ne P\in\mathbb F[x_1,\dots,x_n]$ have degree $d$ and let $S\subseteq\mathbb F$ be finite. Then*
$$\sum_{\mathbf a\in S^n}\operatorname{mult}(P,\mathbf a)\le d\,|S|^{n-1}.$$

*Proof.* Induction on $n$. For $n=1$ this is Lemma 2.5(v). For $n>1$, write $P=\sum_{j=0}^tP_j(\mathbf x')x_n^j$ with $\mathbf x'=(x_1,\dots,x_{n-1})$ and $P_t\ne0$; then $\deg P_t\le d-t$. Fix $\mathbf a\in S^{n-1}$ and put $m_{\mathbf a}=\operatorname{mult}(P_t,\mathbf a)$, which is finite since $P_t\ne0$. We claim
$$\sum_{b\in S}\operatorname{mult}\big(P,(\mathbf a,b)\big)\le|S|\,m_{\mathbf a}+t.\tag{2.1}$$
Choose $\mathbf i'\in\mathbb N^{n-1}$ with $|\mathbf i'|=m_{\mathbf a}$ and $P_t^{(\mathbf i')}(\mathbf a)\ne0$, and let $R=P^{(\mathbf i',0)}$ be the Hasse derivative of $P$ of order $\mathbf i'$ in the variables $\mathbf x'$ and order $0$ in $x_n$. From the definition, $R=\sum_jP_j^{(\mathbf i')}(\mathbf x')x_n^j$, so the univariate polynomial $R(\mathbf a,x_n)$ has degree exactly $t$, its coefficient of $x_n^t$ being $P_t^{(\mathbf i')}(\mathbf a)\ne0$. By Lemma 2.5(v),
$$\sum_{b\in S}\operatorname{mult}\big(R(\mathbf a,\cdot),b\big)\le t.$$
For each $b$, Lemma 2.5(iii) gives $\operatorname{mult}(R,(\mathbf a,b))\ge\operatorname{mult}(P,(\mathbf a,b))-m_{\mathbf a}$, and Lemma 2.5(iv), applied to the line $(\mathbf a,b)+s(\mathbf 0,1)$, gives $\operatorname{mult}(R(\mathbf a,\cdot),b)\ge\operatorname{mult}(R,(\mathbf a,b))$. Combining,
$$\operatorname{mult}\big(P,(\mathbf a,b)\big)\le m_{\mathbf a}+\operatorname{mult}\big(R(\mathbf a,\cdot),b\big),$$
and summing over $b\in S$ proves (2.1). Now sum (2.1) over $\mathbf a\in S^{n-1}$, using the induction hypothesis $\sum_{\mathbf a}m_{\mathbf a}\le(d-t)|S|^{n-2}$ for $P_t$:
$$\sum_{\mathbf a\in S^{n-1}}\sum_{b\in S}\operatorname{mult}\big(P,(\mathbf a,b)\big)\le|S|(d-t)|S|^{n-2}+t|S|^{n-1}=d|S|^{n-1}.\qquad\blacksquare$$

Lemma 2.6 is the case in which every multiplicity is replaced by $\min(\operatorname{mult},1)$. The multiplicity version costs nothing more than the bookkeeping of §2.3, and it is exactly what the Kakeya argument of §4.4 needs.

## 2.6 Rank

**Lemma 2.9 (Rank).** *Let $A,B$ be finite sets, $\mathbb F$ a field, and $f:A\times B\to\mathbb F$. If $f(x,y)=\sum_{k=1}^rg_k(x)h_k(y)$ for some functions $g_k:A\to\mathbb F$, $h_k:B\to\mathbb F$, then the matrix $(f(x,y))_{x\in A,y\in B}$ has rank at most $r$.*

*Proof.* Each summand $(g_k(x)h_k(y))_{x,y}$ is the outer product of two vectors and has rank at most $1$; rank is subadditive. ∎

The lemma is trivial; its force comes from the following observation of Croot, Lev, and Pach (2017), in the form given by Tao (2016).

**Lemma 2.10 (Croot–Lev–Pach).** *Let $\mathcal M$ be a set of monomials in $\mathbb F[x_1,\dots,x_n]$ that is closed under division (if $\mathbf x^{\boldsymbol\alpha}\in\mathcal M$ and $\boldsymbol\beta\le\boldsymbol\alpha$ then $\mathbf x^{\boldsymbol\beta}\in\mathcal M$), and for $e\ge0$ let $M_e$ be the number of monomials in $\mathcal M$ of degree at most $e$, with $M_{-1}=0$. Let $P$ be a linear combination of monomials in $\mathcal M$ of degree at most $d$. Then for every finite $A\subseteq\mathbb F^n$ the matrix $\big(P(\mathbf x+\mathbf y)\big)_{\mathbf x,\mathbf y\in A}$ has rank at most*
$$M_{\lfloor d/2\rfloor}+M_{\lceil d/2\rceil-1}\le2M_{\lfloor d/2\rfloor}.$$

*Proof.* Each monomial $(\mathbf x+\mathbf y)^{\boldsymbol\gamma}$ with $\mathbf x^{\boldsymbol\gamma}\in\mathcal M$, $|\boldsymbol\gamma|\le d$, expands as $\sum_{\boldsymbol\alpha+\boldsymbol\beta=\boldsymbol\gamma}\binom{\boldsymbol\gamma}{\boldsymbol\alpha}\mathbf x^{\boldsymbol\alpha}\mathbf y^{\boldsymbol\beta}$, and each term has $\mathbf x^{\boldsymbol\alpha},\mathbf y^{\boldsymbol\beta}\in\mathcal M$ (closure under division) and $|\boldsymbol\alpha|+|\boldsymbol\beta|\le d$. Hence
$$P(\mathbf x+\mathbf y)=\sum c_{\boldsymbol\alpha,\boldsymbol\beta}\,\mathbf x^{\boldsymbol\alpha}\mathbf y^{\boldsymbol\beta}$$
over pairs with $\mathbf x^{\boldsymbol\alpha},\mathbf y^{\boldsymbol\beta}\in\mathcal M$ and $|\boldsymbol\alpha|+|\boldsymbol\beta|\le d$. In every such pair, either $|\boldsymbol\alpha|\le\lfloor d/2\rfloor$ or $|\boldsymbol\beta|\le d-\lfloor d/2\rfloor-1=\lceil d/2\rceil-1$. Group the terms accordingly:
$$P(\mathbf x+\mathbf y)=\sum_{|\boldsymbol\alpha|\le\lfloor d/2\rfloor}\mathbf x^{\boldsymbol\alpha}F_{\boldsymbol\alpha}(\mathbf y)+\sum_{|\boldsymbol\beta|\le\lceil d/2\rceil-1}G_{\boldsymbol\beta}(\mathbf x)\,\mathbf y^{\boldsymbol\beta},$$
where the first sum collects all terms with $|\boldsymbol\alpha|\le\lfloor d/2\rfloor$ and the second the remaining terms. The number of summands is at most $M_{\lfloor d/2\rfloor}+M_{\lceil d/2\rceil-1}$, and Lemma 2.9 applies. ∎

The case that matters in Chapter 6 is $\mathbb F=\mathbb F_3$ and $\mathcal M$ the reduced monomials, those with every exponent in $\{0,1,2\}$, for which $M_e=m_e:=\#\{\boldsymbol\alpha\in\{0,1,2\}^n:|\boldsymbol\alpha|\le e\}$.

One further elementary lemma is needed there.

**Lemma 2.11 (Support).** *Let $W\subseteq\mathbb F^{S}$ be a linear subspace of dimension $D$, where $S$ is a finite set. Then some $w\in W$ has at least $D$ nonzero coordinates.*

*Proof.* Let $w\in W$ have support $T=\{s:w_s\ne0\}$ of maximal size, and suppose $|T|<D$. The projection $W\to\mathbb F^T$ has kernel of dimension at least $D-|T|>0$; let $v\ne0$ be in it, so $v_s=0$ for $s\in T$ and $v_{s_0}\ne0$ for some $s_0\notin T$. Then $w+v$ agrees with $w$ on $T$ and with $v$ off $T$, so its support is $T\cup\operatorname{supp}(v)\supsetneq T$, contradicting maximality. ∎

## 2.7 Summary

The dissertation uses: the dimension count $\binom{d+n}{n}$ (Lemma 2.1); the counting lemma with and without multiplicity (Lemma 2.2); the properties (i) to (vi) of Hasse derivatives (Lemma 2.5); the Schwartz–Zippel lemma (2.6) and its multiplicity form (2.8); the Combinatorial Nullstellensatz (Theorem 2.7); the rank lemma (2.9) with the Croot–Lev–Pach expansion (2.10); and the support lemma (2.11). Nothing else of a general nature is needed. Each subsequent chapter begins by saying which of these it uses.
# Chapter 3. Sums of Residues

This chapter uses the Combinatorial Nullstellensatz (Theorem 2.7) and, in §3.4, the vanishing of power sums over a finite field. It uses no counting and no multiplicity. Throughout, $p$ is a prime and $\mathbb Z_p=\mathbb F_p$.

## 3.1 Cauchy–Davenport

**Theorem 3.1 (Cauchy 1813; Davenport 1935).** *Let $A,B\subseteq\mathbb Z_p$ be nonempty. Then $|A+B|\ge\min(p,\,|A|+|B|-1)$.*

*Proof.* Let $|A|=k$, $|B|=l$. Suppose first that $k+l-1\le p$ and, for contradiction, that $|A+B|\le k+l-2$. Since $k+l-2\le p-1$, we can choose $C\subseteq\mathbb Z_p$ with $A+B\subseteq C$ and $|C|=k+l-2$. Let
$$f(x,y)=\prod_{c\in C}(x+y-c)\in\mathbb Z_p[x,y].$$
Then $\deg f=k+l-2=(k-1)+(l-1)$, and the coefficient of $x^{k-1}y^{l-1}$ in $f$ is the coefficient of $x^{k-1}y^{l-1}$ in $(x+y)^{k+l-2}$, namely $\binom{k+l-2}{k-1}$, which is nonzero in $\mathbb Z_p$ because $k+l-2<p$ and $\binom{k+l-2}{k-1}$ is a quotient of products of integers less than $p$. By Theorem 2.7(b) with $S_1=A$, $S_2=B$, $t_1=k-1$, $t_2=l-1$, there is $(a,b)\in A\times B$ with $f(a,b)\ne0$, i.e. $a+b\notin C$. This contradicts $A+B\subseteq C$.

If $k+l-1>p$, choose $A'\subseteq A$ with $|A'|=k$ and $B'\subseteq B$ with $|B'|=p+1-k$, which is possible since $1\le p+1-k\le l$. The case already proved gives $|A'+B'|\ge\min(p,p)=p$, so $A+B\supseteq A'+B'=\mathbb Z_p$. ∎

The theorem is due to Cauchy, who used it in his work on Fermat's polygonal number theorem; Davenport rediscovered it and later acknowledged the priority (Davenport 1947). The proof above is from Alon, Nathanson, and Ruzsa (1995). The bound is attained by arithmetic progressions with the same common difference: if $A=\{0,1,\dots,k-1\}$ and $B=\{0,1,\dots,l-1\}$ then $A+B=\{0,\dots,k+l-2\}$. Vosper (1956) showed that for $2\le k,l$ and $k+l\le p-1$ these are essentially the only extremal pairs; the polynomial method does not give structural information of this kind, a point taken up in §8.2.

## 3.2 The Alon–Nathanson–Ruzsa theorem

The proof of Theorem 3.1 has an obvious generalisation: multiply $f$ by any polynomial $h(x,y)$ and one obtains a lower bound on the set of sums $a+b$ with $h(a,b)\ne0$.

**Theorem 3.2 (Alon, Nathanson, and Ruzsa 1996).** *Let $A,B\subseteq\mathbb Z_p$ with $|A|=k\ge1$, $|B|=l\ge1$, let $h\in\mathbb Z_p[x,y]$ have degree exactly $m\ge0$, and suppose $m\le k+l-2$ and $k+l-1-m\le p$. Let*
$$C=\{a+b:\ a\in A,\ b\in B,\ h(a,b)\ne0\}.$$
*If the coefficient of $x^{k-1}y^{l-1}$ in $h(x,y)\,(x+y)^{k+l-2-m}$ is nonzero, then $|C|\ge k+l-1-m$.*

*Proof.* Suppose $|C|\le k+l-2-m$. Since $k+l-2-m\le p-1$, choose $C'\supseteq C$ with $|C'|=k+l-2-m$ and let
$$f(x,y)=h(x,y)\prod_{c\in C'}(x+y-c),\qquad\deg f=m+(k+l-2-m)=k+l-2.$$
The homogeneous part of $f$ of degree $k+l-2$ is $h_m(x,y)(x+y)^{k+l-2-m}$, where $h_m$ is the degree-$m$ homogeneous part of $h$; the lower-degree parts of $h$ and the constants $c$ contribute only to monomials of lower degree. Hence the coefficient of $x^{k-1}y^{l-1}$ in $f$ equals its coefficient in $h_m(x+y)^{k+l-2-m}$, which equals its coefficient in $h(x+y)^{k+l-2-m}$, since $x^{k-1}y^{l-1}$ has degree $k+l-2$ and the parts of $h$ of degree less than $m$ produce only monomials of degree less than $k+l-2$. By hypothesis this coefficient is nonzero. Theorem 2.7(b) with $S_1=A$, $S_2=B$, $t_1=k-1$, $t_2=l-1$ gives $(a,b)\in A\times B$ with $f(a,b)\ne0$, so $h(a,b)\ne0$ and $a+b\notin C'\supseteq C$; but then $a+b\in C$, a contradiction. ∎

Theorem 3.1 is the case $h=1$. The next two corollaries are the cases $h=x-y$; they concern the *restricted sumset* $A\mathbin{\hat+}B=\{a+b:a\in A,b\in B,a\ne b\}$.

## 3.3 Restricted sums and the Erdős–Heilbronn conjecture

Erdős and Heilbronn (1964) conjectured that $|A\mathbin{\hat+}A|\ge\min(p,2|A|-3)$ for $A\subseteq\mathbb Z_p$. The conjecture was proved by Dias da Silva and Hamidoune (1994) using the representation theory of the symmetric group; Alon, Nathanson, and Ruzsa (1995, 1996) gave the polynomial proof reproduced here, which also handles sets of different sizes.

**Corollary 3.3 (Alon, Nathanson, and Ruzsa 1996).** *Let $A,B\subseteq\mathbb Z_p$ be nonempty with $|A|=k\ne l=|B|$. Then $|A\mathbin{\hat+}B|\ge\min(p,k+l-2)$.*

*Proof.* Suppose first $k+l-2\le p$. Apply Theorem 3.2 with $h=x-y$, $m=1$. The coefficient of $x^{k-1}y^{l-1}$ in $(x-y)(x+y)^{k+l-3}=x(x+y)^{k+l-3}-y(x+y)^{k+l-3}$ is
$$\binom{k+l-3}{k-2}-\binom{k+l-3}{k-1}=\frac{(k+l-3)!}{(k-1)!\,(l-1)!}\,\big[(k-1)-(l-1)\big]=\frac{(k+l-3)!\,(k-l)}{(k-1)!\,(l-1)!},$$
where a binomial with a negative lower index is $0$ and the identity is checked by putting both terms over the common denominator $(k-1)!(l-1)!$. This is an integer (a difference of binomial coefficients) and its numerator $(k+l-3)!\,(k-l)$ is not divisible by $p$, because $k+l-3<p$ and $0<|k-l|<p$; its denominator is likewise prime to $p$. So the coefficient is nonzero in $\mathbb Z_p$, and the theorem gives $|A\mathbin{\hat+}B|\ge k+l-2$.

If $k+l-2>p$, then $k+l\ge p+3$ and we choose $A'\subseteq A$, $B'\subseteq B$ with $|A'|+|B'|=p+2$; since $p$ is odd (the case $p=2$ being trivial), $p+2$ is odd and $|A'|\ne|B'|$ automatically. The first case gives $|A'\mathbin{\hat+}B'|\ge p$, so $A\mathbin{\hat+}B=\mathbb Z_p$. ∎

When $k=l$ the coefficient above is $0$, and the argument must choose a different monomial.

**Corollary 3.4 (Erdős–Heilbronn conjecture; Dias da Silva and Hamidoune 1994).** *Let $A\subseteq\mathbb Z_p$ with $|A|=k\ge2$. Then $|A\mathbin{\hat+}A|\ge\min(p,2k-3)$.*

*Proof.* Suppose first $2k-3\le p$ and, for contradiction, that $|A\mathbin{\hat+}A|\le2k-4$. Since $2k-4\le p-1$, choose $C'\supseteq A\mathbin{\hat+}A$ with $|C'|=2k-4$, and let
$$f(x,y)=(x-y)\prod_{c\in C'}(x+y-c),\qquad\deg f=2k-3=(k-1)+(k-2).$$
The coefficient of $x^{k-1}y^{k-2}$ in $f$ is its coefficient in $(x-y)(x+y)^{2k-4}$, namely
$$\binom{2k-4}{k-2}-\binom{2k-4}{k-1}=\frac{(2k-4)!}{(k-1)!\,(k-2)!}\big[(k-1)-(k-2)\big]=\frac{(2k-4)!}{(k-1)!\,(k-2)!}=\frac{1}{k-1}\binom{2k-4}{k-2},$$
the $(k-2)$-nd Catalan number, an integer whose numerator $(2k-4)!$ is prime to $p$ because $2k-4<p$. So the coefficient is nonzero in $\mathbb Z_p$. Apply Theorem 2.7(b) with $S_1=S_2=A$, $t_1=k-1$, $t_2=k-2$; the hypotheses $|S_1|\ge k$ and $|S_2|\ge k-1$ hold. There is $(a,b)\in A\times A$ with $f(a,b)\ne0$, i.e. $a\ne b$ and $a+b\notin C'$, contradicting $C'\supseteq A\mathbin{\hat+}A$.

If $2k-3>p$, then $k\ge(p+4)/2>(p+3)/2$, so we may choose $A'\subseteq A$ with $|A'|=k'=(p+3)/2$ (an integer since $p$ is odd). Then $2k'-3=p$, and the first case gives $|A'\mathbin{\hat+}A'|\ge p$. ∎

The bound is attained by arithmetic progressions: for $A=\{0,1,\dots,k-1\}$ the restricted sumset is $\{1,\dots,2k-3\}$, since $0$ and $2k-2$ arise only from $0+0$ and $(k-1)+(k-1)$. The exact minimum of $|A\mathbin{\hat+}A|$ over all $k$-subsets of $\mathbb Z_p$ has been computed for $p\le17$ (Appendix A, Table A.1) and equals $\min(p,2k-3)$ for every $k\ge2$; likewise the minimum of $|A\mathbin{\hat+}B|$ over pairs with $|A|\ne|B|$ equals $\min(p,k+l-2)$ for $p\le11$. Both bounds are therefore sharp for every $k$, not merely asymptotically.

The general form of Theorem 3.2 allows other restrictions. Taking $h(x,y)=\prod_{\delta\in D}(x-y-\delta)$ for a set $D$ of forbidden differences gives $|\{a+b: a-b\notin D\}|\ge k+l-1-|D|$ whenever the corresponding coefficient is nonzero, which Alon, Nathanson, and Ruzsa verify for $|A|=|B|$ and $D$ of size less than $p$; I do not reproduce the coefficient computation.

## 3.4 Chevalley–Warning

The second application of the zeros principle in this chapter uses not the Nullstellensatz but the following property of power sums.

**Lemma 3.5.** *For an integer $a\ge0$ (with $0^0=1$),*
$$\sum_{t\in\mathbb F_q}t^a=\begin{cases}-1&\text{if }a\ge1\text{ and }(q-1)\mid a,\\ 0&\text{otherwise.}\end{cases}$$
*Consequently, if a monomial $\mathbf x^{\boldsymbol\alpha}$ has $|\boldsymbol\alpha|<n(q-1)$ then $\sum_{\mathbf x\in\mathbb F_q^n}\mathbf x^{\boldsymbol\alpha}=0$, and the same holds for any polynomial of degree less than $n(q-1)$.*

*Proof.* If $a=0$ the sum is $q\cdot1=0$. If $a\ge1$ and $(q-1)\mid a$, then $t^a=1$ for $t\ne0$ and the sum is $q-1=-1$. Otherwise let $g$ generate the cyclic group $\mathbb F_q^\times$; then $g^a\ne1$ and $\sum_{t\ne0}t^a=\sum_{j=0}^{q-2}g^{aj}=\frac{g^{a(q-1)}-1}{g^a-1}=0$. For the consequence, $\sum_{\mathbf x}\mathbf x^{\boldsymbol\alpha}=\prod_i\sum_{x_i}x_i^{\alpha_i}$; if $|\boldsymbol\alpha|<n(q-1)$ then some $\alpha_i<q-1$, and the $i$-th factor is $0$ by the first part (whether $\alpha_i=0$ or $1\le\alpha_i\le q-2$). ∎

**Theorem 3.6 (Chevalley 1935; Warning 1935).** *Let $f_1,\dots,f_r\in\mathbb F_q[x_1,\dots,x_n]$ with $\sum_{i=1}^r\deg f_i<n$. Then the number $N$ of common zeros of $f_1,\dots,f_r$ in $\mathbb F_q^n$ is divisible by $p$. In particular, if the $f_i$ have a common zero, they have another.*

*Proof.* Let $F(\mathbf x)=\prod_{i=1}^r\big(1-f_i(\mathbf x)^{q-1}\big)$. For $\mathbf x\in\mathbb F_q^n$, $F(\mathbf x)=1$ if every $f_i(\mathbf x)=0$ and $F(\mathbf x)=0$ otherwise, since $t^{q-1}=1$ for $t\ne0$. Hence $N\equiv\sum_{\mathbf x\in\mathbb F_q^n}F(\mathbf x)\pmod p$. But $\deg F\le(q-1)\sum\deg f_i<(q-1)n$, so the sum vanishes by Lemma 3.5. ∎

Warning's paper proves the stronger statement $N\ge q^{n-\sum\deg f_i}$ when $N>0$; Ax (1964) proved that $N$ is divisible by $q^{\lceil n/\sum\deg f_i\rceil-1}$. Neither is needed here.

## 3.5 Erdős–Ginzburg–Ziv

**Theorem 3.7 (Erdős, Ginzburg, and Ziv 1961).** *Among any $2n-1$ integers there are $n$ whose sum is divisible by $n$.*

*Proof.* First let $n=p$ be prime, and let $a_1,\dots,a_{2p-1}$ be the integers, regarded in $\mathbb F_p$. Consider
$$f_1=\sum_{i=1}^{2p-1}a_ix_i^{p-1},\qquad f_2=\sum_{i=1}^{2p-1}x_i^{p-1}\quad\in\mathbb F_p[x_1,\dots,x_{2p-1}].$$
Here $\deg f_1+\deg f_2\le2p-2<2p-1$, the number of variables, so by Theorem 3.6 the number of common zeros is divisible by $p$. The origin is a common zero, so there is another, $\mathbf x\ne\mathbf 0$. Let $I=\{i:x_i\ne0\}$, so $I\ne\emptyset$. Since $x_i^{p-1}=1$ for $i\in I$ and $0$ otherwise, $f_2(\mathbf x)=|I|\equiv0\pmod p$ with $1\le|I|\le2p-1$, whence $|I|=p$; and $f_1(\mathbf x)=\sum_{i\in I}a_i\equiv0\pmod p$. So the $p$ integers $a_i$, $i\in I$, have sum divisible by $p$.

For composite $n=uv$ with $u,v\ge2$, assume the theorem for $u$ and for $v$. Given $2uv-1$ integers, extract disjoint $u$-subsets with sum divisible by $u$ as long as at least $2u-1$ integers remain: after $j$ extractions, $2uv-1-ju\ge2u-1$ iff $j\le2v-2$, so we obtain $2v-1$ disjoint subsets $I_1,\dots,I_{2v-1}$, each of size $u$ with sum $us_j$. By the theorem for $v$, some $v$ of the integers $s_j$ have sum divisible by $v$; the union of the corresponding $I_j$ has $uv=n$ elements and sum $u\sum s_j$ divisible by $uv$. Induction on $n$ completes the proof. ∎

The theorem is sharp: $n-1$ zeros and $n-1$ ones contain no $n$ terms with sum divisible by $n$. The proof of the prime case via Chevalley–Warning is from the original paper of Erdős, Ginzburg, and Ziv, though they attribute the idea to a remark of Erdős; Alon (1999, §5) gives an alternative proof through the Nullstellensatz. The theorem has been verified by exhaustive computation over all multisets of $2n-1$ residues for $n\le9$ (Appendix A). Its two-dimensional analogue, Kemnitz's conjecture (1983) that any $4n-3$ points of $\mathbb Z^2$ contain $n$ whose sum is divisible by $n$ in both coordinates, was proved by Reiher (2007) by an elaboration of the same method.

## 3.6 What the chapter shows

Every result in this chapter has the same shape. A set of sums is supposed small; a product $\prod_c(x+y-c)$ over the supposed sumset, times a restriction polynomial $h$, is a polynomial of degree exactly $\sum t_i$ whose value on $A\times B$ is forced to be zero by the smallness of the sumset; a single monomial coefficient, computed by a binomial identity, is nonzero; and the Nullstellensatz says the two are incompatible. The only place where number theory enters is in checking that the coefficient is nonzero modulo $p$, which reduces to the observation that factorials of numbers less than $p$ are prime to $p$. The method gives exact constants (the bounds are sharp for every $k$, as the computations of Appendix A confirm) but no structure: it does not say which sets attain the bounds.
# Chapter 4. Kakeya Sets over Finite Fields

This chapter uses the counting lemma (2.2), in both its plain and its multiplicity form; the Schwartz–Zippel lemma (2.6) and its multiplicity form (2.8); and the properties of Hasse derivatives along lines (Lemma 2.5). The bridge between counting and zeros is the restriction of a polynomial to the lines that a Kakeya set contains.

## 4.1 The problem

Kakeya (1917) asked for the least area of a planar region in which a unit segment can be rotated through a full turn; Besicovitch (1928) showed that the area can be made arbitrarily small, and indeed that there are sets of measure zero in $\mathbb R^n$ containing a unit segment in every direction. The *Kakeya conjecture* asserts that such sets nevertheless have Hausdorff dimension $n$. It is proved for $n=2$ and open for $n\ge3$, and it is connected to central questions in harmonic analysis and partial differential equations.

Wolff (1999) proposed a finite-field model of the problem.

**Definition 4.1.** A set $K\subseteq\mathbb F_q^n$ is a *Kakeya set* if it contains a line in every direction: for every $\mathbf b\in\mathbb F_q^n\setminus\{\mathbf 0\}$ there is $\mathbf a\in\mathbb F_q^n$ with $\{\mathbf a+t\mathbf b:t\in\mathbb F_q\}\subseteq K$.

Wolff conjectured that a Kakeya set has at least $c_nq^n$ points, with $c_n>0$ depending only on $n$, and this was proved by Dvir (2009) with $c_n=1/n!$ after a decade in which the best bounds had the form $q^{\gamma n}$ with $\gamma<1$ (Wolff 1999; Mockenhaupt and Tao 2004). The multiplicity refinement of Saraf and Sudan (2008) and Dvir, Kopparty, Saraf, and Sudan (2013) raised $c_n$ to $2^{-n}$ up to lower-order terms, which is within a factor of about $2$ of the best constructions.

## 4.2 Dvir's theorem

**Theorem 4.2 (Dvir 2009).** *Every Kakeya set $K\subseteq\mathbb F_q^n$ satisfies*
$$|K|\ge\binom{q+n-1}{n}\ge\frac{q^n}{n!}.$$

*Proof.* Suppose $|K|<\binom{q-1+n}{n}$. By Lemma 2.2(a) there is a nonzero polynomial $P\in\mathbb F_q[\mathbf x]$ of degree $d\le q-1$ vanishing on $K$. Since $K\ne\emptyset$ (it contains lines), $P$ is not a nonzero constant, so $d\ge1$. Let $P_d$ be the top homogeneous part of $P$.

Let $\mathbf b\ne\mathbf 0$ and choose $\mathbf a$ with the line $\{\mathbf a+t\mathbf b\}$ contained in $K$. The univariate polynomial $P(\mathbf a+t\mathbf b)$ has degree at most $d\le q-1$ and vanishes at all $q$ points $t\in\mathbb F_q$, so by Lemma 2.5(v) it is the zero polynomial. In particular its coefficient of $t^d$ vanishes, and by Lemma 2.5(vi) that coefficient is $P_d(\mathbf b)$. Thus $P_d(\mathbf b)=0$ for every $\mathbf b\ne\mathbf 0$; and $P_d(\mathbf 0)=0$ since $P_d$ is homogeneous of positive degree. So $P_d$ vanishes on all of $\mathbb F_q^n$.

But $P_d$ is a nonzero polynomial of degree $d\le q-1<q$, so by Lemma 2.6 it has at most $dq^{n-1}<q^n$ zeros in $\mathbb F_q^n$. This is a contradiction. The inequality $\binom{q+n-1}{n}=\frac{(q+n-1)\cdots q}{n!}\ge\frac{q^n}{n!}$ is clear. ∎

The argument uses only one line per direction and only the fact that a line has $q$ points; it does not use that the lines are in different directions except through the conclusion that $P_d$ vanishes everywhere. The same proof gives more.

**Corollary 4.3 (Dvir 2009).** *Let $1\le k\le q$ and suppose $K\subseteq\mathbb F_q^n$ contains, for every direction $\mathbf b\ne\mathbf 0$, at least $k$ points of some line in direction $\mathbf b$. Then $|K|\ge\binom{k+n-1}{n}$.*

*Proof.* If $|K|<\binom{k-1+n}{n}$, a nonzero $P$ of degree $d\le k-1$ vanishes on $K$, with $d\ge1$. For each $\mathbf b\ne\mathbf 0$ the restriction $P(\mathbf a+t\mathbf b)$ to the corresponding line has degree at most $d\le k-1$ and at least $k$ roots, so is zero, and $P_d(\mathbf b)=0$ as before. Then $P_d$ vanishes on $\mathbb F_q^n$ with degree $d\le k-1\le q-1$, contradicting Lemma 2.6. ∎

## 4.3 The method of multiplicities

Dvir's bound has the right order $q^n$ but the constant $1/n!$ is far from the truth. The loss occurs at one place: the polynomial is required to vanish at each point of $K$, which costs one linear condition per point, and the degree it can then be given is $d\approx(n!\,|K|)^{1/n}$; the argument then needs $d<q$. Suppose instead the polynomial is required to vanish to order $m$ at each point. This costs $\binom{m+n-1}{n}\approx m^n/n!$ conditions per point, so the degree becomes $d\approx(n!\,|K|)^{1/n}\,m$, apparently no better. But the restriction to a line now vanishes to order $m$ at each of $q$ points, so it is zero as soon as $d<mq$ rather than $d<q$. The two factors of $m$ cancel, the factor $n!$ remains, and nothing has been gained.

The gain comes from a second observation. If $P$ vanishes to order $m$ on $K$, then every Hasse derivative $P^{(\mathbf i)}$ with $|\mathbf i|<m$ vanishes to order $m-|\mathbf i|$ on $K$ (Lemma 2.5(iii)), and the same restriction argument applied to $P^{(\mathbf i)}$ shows that $(P_d)^{(\mathbf i)}$ vanishes on every direction, provided $d-|\mathbf i|<(m-|\mathbf i|)q$. Thus $P_d$ vanishes on all of $\mathbb F_q^n$ not merely to order $1$ but to order roughly $(mq-d)/(q-1)$, and the multiplicity Schwartz–Zippel lemma (2.8) then forces $d\gtrsim mq^2/(2q-1)$, rather than $d\ge q$. Since $\binom{d+n}{n}/\binom{m+n-1}{n}\to(d/m)^n$ as $m\to\infty$, the bound on $|K|$ becomes $(q^2/(2q-1))^n$, and the $n!$ has disappeared.

The following lemma packages the restriction argument.

**Lemma 4.4.** *Let $K\subseteq\mathbb F_q^n$ be a Kakeya set, and let $0\ne P\in\mathbb F_q[\mathbf x]$ have degree $d$ and vanish to order at least $m$ at every point of $K$. Let $\mathbf i\in\mathbb N^n$ satisfy*
$$d-|\mathbf i|<(m-|\mathbf i|)\,q.$$
*Then $(P_d)^{(\mathbf i)}(\mathbf b)=0$ for every $\mathbf b\in\mathbb F_q^n\setminus\{\mathbf 0\}$.*

*Proof.* If $|\mathbf i|\ge m$, the hypothesis gives $d-|\mathbf i|<0$, so by Lemma 2.5(ii) both $P^{(\mathbf i)}$ and $(P_d)^{(\mathbf i)}$ have negative degree, i.e. are zero, and there is nothing to prove. Assume $|\mathbf i|<m$. Fix $\mathbf b\ne\mathbf 0$ and $\mathbf a$ with $\{\mathbf a+t\mathbf b\}\subseteq K$. Let $R=P^{(\mathbf i)}$ and $Q(t)=R(\mathbf a+t\mathbf b)\in\mathbb F_q[t]$. By Lemma 2.5(ii), $\deg R\le d-|\mathbf i|$, so $\deg Q\le d-|\mathbf i|$. By Lemma 2.5(iii), $R$ vanishes to order at least $m-|\mathbf i|$ at every point of $K$, hence at every point $\mathbf a+t\mathbf b$, $t\in\mathbb F_q$; by Lemma 2.5(iv), $\operatorname{mult}(Q,t)\ge m-|\mathbf i|$ for every $t\in\mathbb F_q$. If $Q\ne0$, Lemma 2.5(v) gives $(m-|\mathbf i|)q\le\sum_t\operatorname{mult}(Q,t)\le\deg Q\le d-|\mathbf i|$, contrary to hypothesis. So $Q=0$, and in particular the coefficient of $t^{d-|\mathbf i|}$ in $Q$ is zero. By Lemma 2.5(vi) applied to $R$ with $e=d-|\mathbf i|$, that coefficient is $R_e(\mathbf b)$, where $R_e$ is the homogeneous part of $R$ of degree $e$; and by Lemma 2.5(ii), $R_e=(P_d)^{(\mathbf i)}$. ∎

## 4.4 The Dvir–Kopparty–Saraf–Sudan bound

**Theorem 4.5 (Dvir, Kopparty, Saraf, and Sudan 2013).** *Every Kakeya set $K\subseteq\mathbb F_q^n$ satisfies*
$$|K|\ge\Big(\frac{q^2}{2q-1}\Big)^n=\Big(\frac{q}{2-1/q}\Big)^n>\frac{q^n}{2^n}.$$

*Proof.* Fix an integer $m\ge1$ and let $d=d(m)$ be the largest integer with $d<\dfrac{mq^2}{2q-1}$, so that $d\ge\dfrac{mq^2}{2q-1}-1$. We claim
$$|K|\binom{m+n-1}{n}\ge\binom{d+n}{n}.\tag{4.1}$$
Suppose not. By Lemma 2.2(b) there is a nonzero $P$ of degree $d'\le d$ vanishing to order at least $m$ at every point of $K$. Note $d'\le d<mq^2/(2q-1)<mq$, so $mq-d'>0$; put
$$m'=\Big\lceil\frac{mq-d'}{q-1}\Big\rceil\ge1.$$
For every $\mathbf i$ with $|\mathbf i|\le m'-1$ we have $|\mathbf i|<\frac{mq-d'}{q-1}$, i.e. $|\mathbf i|(q-1)<mq-d'$, i.e. $d'-|\mathbf i|<(m-|\mathbf i|)q$. Lemma 4.4 (applied to $P$, of degree $d'$) therefore gives $(P_{d'})^{(\mathbf i)}(\mathbf b)=0$ for all $|\mathbf i|\le m'-1$ and all $\mathbf b\ne\mathbf 0$: the polynomial $P_{d'}$ vanishes to order at least $m'$ at every nonzero point of $\mathbb F_q^n$. At the origin, $P_{d'}$ is a nonzero homogeneous polynomial of degree $d'$, so $\operatorname{mult}(P_{d'},\mathbf 0)=d'$ exactly.

Apply Lemma 2.8 to $P_{d'}$ with $S=\mathbb F_q$:
$$m'(q^n-1)+d'\le\sum_{\mathbf x\in\mathbb F_q^n}\operatorname{mult}(P_{d'},\mathbf x)\le d'q^{n-1},$$
so $m'(q^n-1)\le d'(q^{n-1}-1)$. If $m'>d'$ this would give $q^n-1<q^{n-1}-1$, which is absurd; so $m'\le d'$, and then $m'q^n\le d'q^{n-1}+(m'-d')\le d'q^{n-1}$, i.e.
$$m'q\le d'.\tag{4.2}$$
Now $m'\ge\dfrac{mq-d'}{q-1}$, so (4.2) gives $q(mq-d')\le d'(q-1)$, i.e. $mq^2\le d'(2q-1)$, i.e. $d'\ge\dfrac{mq^2}{2q-1}$. This contradicts $d'\le d<\dfrac{mq^2}{2q-1}$, and proves (4.1).

From (4.1),
$$|K|\ge\frac{\binom{d+n}{n}}{\binom{m+n-1}{n}}=\prod_{j=1}^n\frac{d+j}{m+j-1}.$$
As $m\to\infty$ with $d=d(m)$, each factor tends to $q^2/(2q-1)$, because $d/m\to q^2/(2q-1)$. Since (4.1) holds for every $m$, $|K|$ is at least the limit, $(q^2/(2q-1))^n$. Finally $q^2/(2q-1)=q/(2-1/q)>q/2$. ∎

**Remark 4.6.** The proof gives slightly more than the limit: for every $m\ge1$, $|K|\ge\prod_{j=1}^n\frac{d(m)+j}{m+j-1}$, and one may take the maximum over $m$. For large $q$ and fixed $n$ the improvement is negligible.

**Remark 4.7.** The two ingredients that distinguish this proof from Dvir's are the passage from $P$ to its derivatives $P^{(\mathbf i)}$ in Lemma 4.4, which converts vanishing of $P$ on $K$ to high-order vanishing of $P_{d'}$ everywhere, and the multiplicity Schwartz–Zippel lemma, which converts high-order vanishing everywhere into a lower bound on the degree. Neither ingredient is specific to Kakeya sets; the first uses only that $K$ contains lines, the second only that $\mathbb F_q^n$ is a grid. Saraf and Sudan (2008) obtained the intermediate bound $q^n/2.6^n$ with the first ingredient alone, using the ordinary Schwartz–Zippel lemma for the derivatives; the second ingredient is what gives the clean constant.

The same argument applies to sets containing only a fraction of each line.

**Corollary 4.8.** *Let $2\le k\le q$ and suppose $K\subseteq\mathbb F_q^n$ contains, for every $\mathbf b\ne\mathbf 0$, at least $k$ points of some line in direction $\mathbf b$. Then*
$$|K|\ge\Big(\frac{kq}{k+q-1}\Big)^n.$$

*Proof.* Repeat the proof of Theorem 4.5 with $d$ the largest integer below $\dfrac{mkq}{k+q-1}$. In Lemma 4.4 the restriction $Q$ now has at least $k$ points of multiplicity $\ge m-|\mathbf i|$, so $Q=0$ whenever $d'-|\mathbf i|<(m-|\mathbf i|)k$, i.e. whenever $|\mathbf i|<\dfrac{mk-d'}{k-1}$, and $P_{d'}$ vanishes to order $m'=\lceil(mk-d')/(k-1)\rceil$ at every nonzero point. Inequality (4.2) is unchanged, since it comes from Lemma 2.8 over $\mathbb F_q^n$; combining $m'q\le d'$ with $m'\ge(mk-d')/(k-1)$ gives $q(mk-d')\le d'(k-1)$, i.e. $d'\ge\dfrac{mkq}{k+q-1}$, a contradiction. The limit $m\to\infty$ gives the bound. ∎

For $k=q$ this is Theorem 4.5; for $k=\delta q$ with $\delta$ fixed it gives $|K|\ge(\delta q/(1+\delta-1/q))^n$, which improves on Corollary 4.3's $\binom{\delta q+n-1}{n}\approx(\delta q)^n/n!$ for large $n$.

## 4.5 Small cases and the plane

How sharp are these bounds? The trivial upper bound is $|K|\le q^n$, and the union of one line per direction has at most $q\cdot\frac{q^n-1}{q-1}<2q^n$ points, so the question is the constant. Constructions of Kakeya sets of size $2^{-(n-1)}q^n+O(q^{n-1})$ for odd $q$ are known (Saraf and Sudan 2008; Dvir 2012, §4), so Theorem 4.5 is within a factor of $2+o(1)$ of the truth for fixed $n$ as $q\to\infty$. Whether the constant is $2^{-n}$ or $2^{-(n-1)}$ or something between is open for $n\ge3$.

In the plane the problem is solved. Blokhuis and Mazzocca (2008) proved that for odd $q$ the minimum size of a Kakeya set in $\mathbb F_q^2$ is exactly
$$\frac{q(q+1)}{2}+\frac{q-1}{2}=\frac{q^2+2q-1}{2},$$
attained by a construction based on a conic. Dvir's bound $\binom{q+1}{2}=q(q+1)/2$ is thus below the truth by exactly $(q-1)/2$, and is asymptotically sharp in the plane, whereas the multiplicity bound $q^4/(2q-1)^2\approx q^2/4$ is weaker there; the multiplicity method wins only in higher dimension, where the $n!$ matters. The following values were computed by exhaustive search over all choices of one line per direction (Appendix A):

| $q$ | minimum $\lvert K\rvert$ | Blokhuis–Mazzocca $(q^2+2q-1)/2$ | Dvir $\binom{q+1}{2}$ | DKSS $q^4/(2q-1)^2$ |
|---|---|---|---|---|
| 3 | 7 | 7 | 6 | 3.24 |
| 5 | 17 | 17 | 15 | 7.72 |
| 7 | 31 | 31 | 28 | 14.21 |

A Kakeya set of size $17$ in $\mathbb F_5^2$ found by the search is drawn in Figure 1 of the front matter, together with the six lines that witness the six directions. Chapter 7 solves the variant in which each of the $q+1$ lines may miss one point, and shows that Dvir's bound falls short of the truth by the same $(q-1)/2$ there.

In three dimensions the comparison reverses for moderate $q$. Dvir gives $\binom{q+2}{3}\approx q^3/6$; DKSS gives $q^6/(2q-1)^3\approx q^3/8$; and for $n=5$ DKSS overtakes Dvir already at $q=5$ ($165$ against $126$). For $q=101$ and $n=5$ the two bounds are $9.66\times10^7$ and $3.37\times10^8$ against $q^n\approx1.05\times10^{10}$; the constructions give about $2^{-4}q^5\approx6.6\times10^8$. The exact minimum is unknown in every case with $n\ge3$.
# Chapter 5. Joints

This chapter uses the counting lemma (2.2(a)), the univariate zeros bound (Lemma 2.5(v)), and, in place of the Schwartz–Zippel lemma, a minimality argument on the degree of the vanishing polynomial. The bridge is the gradient of the polynomial at a joint.

## 5.1 The problem

**Definition 5.1.** Let $\mathcal L$ be a finite set of lines in $\mathbb F^n$. A point $\mathbf x\in\mathbb F^n$ is a *joint* of $\mathcal L$ if it lies on $n$ lines of $\mathcal L$ whose direction vectors are linearly independent.

In $\mathbb R^3$ a joint is a point where three non-coplanar lines meet. The problem of bounding the number of joints of $L$ lines was raised by Chazelle and others (1992) in computational geometry. A grid of $k^3$ points with the $3k^2$ axis-parallel lines through them has $L=3k^2$ lines and $k^3=(L/3)^{3/2}$ joints, and it was conjectured that $O(L^{3/2})$ is the truth. Sharir (1994) proved $O(L^{7/4})$ and Feldman and Sharir (2005) improved the exponent slightly, by methods of combinatorial geometry. Guth and Katz (2010) proved $O(L^{3/2})$ with the polynomial method, and Kaplan, Sharir, and Shustin (2010) and Quilodrán (2010) independently simplified the argument and extended it to $\mathbb R^n$. Carbery and Iliopoulou (2014) extended it to arbitrary fields. The proof below follows the simplified argument.

## 5.2 Three lemmas

**Lemma 5.2 (Pruning).** *Let $\mathcal L$ be a set of $L$ lines in $\mathbb F^n$ with a set $J$ of joints, $|J|=m\ge1$. Then there are $\mathcal L'\subseteq\mathcal L$ and $J'\subseteq J$ with $|J'|\ge m/2$ such that every point of $J'$ is a joint of $\mathcal L'$ and every line of $\mathcal L'$ contains at least $\dfrac{m}{2L}$ points of $J'$.*

*Proof.* Start with $\mathcal L'=\mathcal L$, $J'=J$. While some line $\ell\in\mathcal L'$ contains fewer than $m/(2L)$ points of $J'$, remove $\ell$ from $\mathcal L'$ and remove the points of $J'$ on $\ell$ from $J'$. Each step removes fewer than $m/(2L)$ points and there are at most $L$ steps, so fewer than $m/2$ points are removed in all and $|J'|>m/2$ at the end. A point that survives was never on a removed line, so all $n$ independent lines through it survive, and it is a joint of $\mathcal L'$. When the process stops, every line of $\mathcal L'$ contains at least $m/(2L)$ points of $J'$. ∎

**Lemma 5.3 (Gradient at a joint).** *Let $P\in\mathbb F[\mathbf x]$ vanish identically on $n$ lines through $\mathbf x_0$ with linearly independent directions $\mathbf v_1,\dots,\mathbf v_n$. Then every partial derivative $\partial_iP$ vanishes at $\mathbf x_0$.*

*Proof.* For each $j$, the polynomial $P(\mathbf x_0+t\mathbf v_j)\in\mathbb F[t]$ is identically zero, hence so is its coefficient of $t$. By Definition 2.3 with $\mathbf y=t\mathbf v_j$, that coefficient is $\sum_{i}P^{(\mathbf e_i)}(\mathbf x_0)\,v_{j,i}=\nabla P(\mathbf x_0)\cdot\mathbf v_j$, where $\nabla P=(\partial_1P,\dots,\partial_nP)$ and $P^{(\mathbf e_i)}=\partial_iP$. So $\nabla P(\mathbf x_0)$ is orthogonal to $n$ linearly independent vectors, hence is zero. ∎

**Lemma 5.4 (Vanishing gradient).** *Let $0\ne P\in\mathbb F[\mathbf x]$ with $\partial_iP=0$ for all $i$.*
*(a) If $\operatorname{char}\mathbb F=0$, then $P$ is a nonzero constant.*
*(b) If $\operatorname{char}\mathbb F=p>0$ and $\mathbb F$ is perfect (for instance finite or algebraically closed), then $P=Q^p$ for some $Q\in\mathbb F[\mathbf x]$ with $\deg Q=\deg P/p$.*

*Proof.* Since $\partial_i\mathbf x^{\boldsymbol\alpha}=\alpha_i\mathbf x^{\boldsymbol\alpha-\mathbf e_i}$ and distinct monomials remain distinct under $\partial_i$, the condition $\partial_iP=0$ says that $\alpha_i=0$ in $\mathbb F$ for every monomial $\mathbf x^{\boldsymbol\alpha}$ of $P$. In characteristic $0$ this means every $\alpha_i=0$, so $P$ is constant. In characteristic $p$ it means $p\mid\alpha_i$ for all $i$ and all monomials, so $P=\sum_{\boldsymbol\beta}c_{\boldsymbol\beta}\mathbf x^{p\boldsymbol\beta}$. Since $\mathbb F$ is perfect, each $c_{\boldsymbol\beta}=b_{\boldsymbol\beta}^p$ for some $b_{\boldsymbol\beta}\in\mathbb F$, and because the Frobenius map $z\mapsto z^p$ is a ring homomorphism of $\mathbb F[\mathbf x]$ in characteristic $p$,
$$P=\sum_{\boldsymbol\beta}b_{\boldsymbol\beta}^p\,\mathbf x^{p\boldsymbol\beta}=\Big(\sum_{\boldsymbol\beta}b_{\boldsymbol\beta}\mathbf x^{\boldsymbol\beta}\Big)^p=Q^p.\qquad\blacksquare$$

## 5.3 The theorem

**Theorem 5.5 (Guth and Katz 2010; Kaplan, Sharir, and Shustin 2010; Quilodrán 2010; Carbery and Iliopoulou 2014).** *Let $\mathbb F$ be any field and $n\ge2$. A set of $L$ lines in $\mathbb F^n$ has at most*
$$C_n\,L^{\frac{n}{n-1}},\qquad C_n=\big(2\,(n!)^{1/n}\big)^{\frac{n}{n-1}},$$
*joints. In particular $L$ lines in $3$-space have at most $\sqrt{48}\,L^{3/2}<6.93\,L^{3/2}$ joints.*

*Proof.* Replacing $\mathbb F$ by its algebraic closure changes neither the lines, nor which points are joints (linear independence over a field is preserved by extension), nor $L$; so we may assume $\mathbb F$ is algebraically closed, hence perfect. Let $J$ be the set of joints, $|J|=m$; if $m=0$ there is nothing to prove. Apply Lemma 5.2 to get $\mathcal L'$ and $J'$ with $|J'|\ge m/2$, every point of $J'$ a joint of $\mathcal L'$, and every line of $\mathcal L'$ containing at least $m/(2L)$ points of $J'$.

Let $d_0$ be the least integer with $\binom{d_0+n}{n}>|J'|$; since $|J'|\ge1$, $d_0\ge1$. By Lemma 2.2(a) some nonzero polynomial of degree at most $d_0$ vanishes on $J'$. Among all nonzero polynomials vanishing on $J'$ choose $P$ of least degree $d^*$; then $1\le d^*\le d_0$ ($d^*\ge1$ because a nonzero constant does not vanish on the nonempty set $J'$).

*Claim: $d^*\ge m/(2L)$.* Suppose $d^*<m/(2L)$. Every line $\ell\in\mathcal L'$ contains at least $m/(2L)>d^*$ points of $J'$, at which $P$ vanishes; the restriction of $P$ to $\ell$ is a univariate polynomial of degree at most $d^*$ with more than $d^*$ roots, hence identically zero (Lemma 2.5(v)). So $P$ vanishes identically on every line of $\mathcal L'$. At each $\mathbf x_0\in J'$ there are $n$ lines of $\mathcal L'$ through $\mathbf x_0$ with independent directions, so by Lemma 5.3 every $\partial_iP$ vanishes at $\mathbf x_0$. Thus each $\partial_iP$ vanishes on $J'$ and has degree at most $d^*-1$; by the minimality of $d^*$, each $\partial_iP=0$. By Lemma 5.4, either $P$ is a nonzero constant, which is impossible, or $\operatorname{char}\mathbb F=p>0$ and $P=Q^p$ with $\deg Q=d^*/p<d^*$; but then $Q$ vanishes on $J'$ (as $Q(\mathbf x)^p=P(\mathbf x)=0$ implies $Q(\mathbf x)=0$), again contradicting minimality. This proves the claim.

*Bounding $d_0$.* By minimality of $d_0$, $\binom{d_0-1+n}{n}\le|J'|\le m$, and
$$\binom{d_0-1+n}{n}=\frac{(d_0+n-1)(d_0+n-2)\cdots d_0}{n!}\ge\frac{d_0^{\,n}}{n!},$$
so $d_0\le(n!\,m)^{1/n}$.

Combining, $\dfrac{m}{2L}\le d^*\le d_0\le(n!\,m)^{1/n}$, i.e. $m^{1-1/n}\le2(n!)^{1/n}L$, i.e. $m\le\big(2(n!)^{1/n}\big)^{n/(n-1)}L^{n/(n-1)}$. For $n=3$, $C_3=(2\cdot6^{1/3})^{3/2}=2^{3/2}\cdot6^{1/2}=\sqrt{48}$. ∎

**Remark 5.6.** The argument differs from the Kakeya argument of Chapter 4 in one structural respect. There, the contradiction came from the Schwartz–Zippel lemma: the top homogeneous part was shown to vanish on all of $\mathbb F_q^n$. Here there is no grid to vanish on, since the field may be infinite, and the contradiction comes instead from *minimality of degree*: the derivatives of the vanishing polynomial vanish on the same set with lower degree. The minimality trick is available whenever the set of vanishing polynomials is closed under an operation that lowers degree, and it is the second of the two ways in which the zeros principle enters the method (the Schwartz–Zippel bound being the first).

**Remark 5.7.** The pruning step is essential: without it, a line containing only one joint would not force $P$ to vanish on the line. The factor $2$ in $C_n$ comes from the pruning, and the factor $(n!)^{1/n}$ from the dimension count. Guth and Katz's original constant and those in the literature since are of the same order; the best constants have been the subject of subsequent work (see Yu and Zhao 2022 for the generalisation from lines to varieties), which I do not pursue.

## 5.4 Sharpness

The exponent $n/(n-1)$ is sharp. Take the grid $[k]^n\subseteq\mathbb F^n$ (any field with at least $k$ elements) and the $nk^{n-1}$ axis-parallel lines through its points. Every grid point is a joint, so $L=nk^{n-1}$ lines have $k^n=(L/n)^{n/(n-1)}$ joints, and the ratio of upper to lower bound is
$$C_n\,n^{n/(n-1)}=\big(2\,n\,(n!)^{1/n}\big)^{n/(n-1)},$$
which for $n=3$ is $\sqrt{48}\cdot3^{3/2}\approx36$. The exponent is right; the constant obtained from this argument is not.

Over a finite field the same example with $k=q$ gives $L=nq^{n-1}$ lines and $q^n$ joints, and the theorem is not vacuous there: it bounds the number of joints of any $L$ lines in $\mathbb F_q^n$ by $C_nL^{n/(n-1)}$ regardless of $q$. This is a genuinely different situation from the Kakeya problem, where the field size $q$ is the parameter and the polynomial's degree is compared with $q$. In the joints problem the degree is compared with the number of joints per line, and the field plays no role beyond supplying Lemma 5.4.
# Chapter 6. Cap Sets

This chapter uses the counting lemma (2.2(a)) in the form of a dimension count on reduced polynomials, the rank lemma with the Croot–Lev–Pach expansion (2.9, 2.10), the support lemma (2.11), and the uniqueness of reduced representatives (Lemma 2.1(b)). It uses neither Schwartz–Zippel nor multiplicity. The bridge is the observation that on a cap set the matrix $(P(\mathbf x+\mathbf y))$ is diagonal.

## 6.1 The problem

**Definition 6.1.** A *cap set* in $\mathbb F_3^n$ is a subset containing no three distinct collinear points.

A line in $\mathbb F_3^n$ is a set $\{\mathbf a,\mathbf a+\mathbf r,\mathbf a+2\mathbf r\}$ with $\mathbf r\ne\mathbf 0$, so a cap set is the same as a set with no nontrivial three-term arithmetic progression, and the cap-set problem is the $\mathbb F_3^n$ analogue of Roth's problem on progressions in the integers. Its popular form is the card game Set, whose $81$ cards are the points of $\mathbb F_3^4$ and whose "sets" are the lines.

**Lemma 6.2.** *Three points $\mathbf x,\mathbf y,\mathbf z\in\mathbb F_3^n$ are collinear if and only if $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$. Moreover, if $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$ and two of the three points coincide, then all three coincide.*

*Proof.* If $\{\mathbf x,\mathbf y,\mathbf z\}=\{\mathbf a,\mathbf a+\mathbf r,\mathbf a+2\mathbf r\}$ then the sum is $3\mathbf a+3\mathbf r=\mathbf 0$. Conversely if $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$ with $\mathbf x\ne\mathbf y$, put $\mathbf a=\mathbf x$, $\mathbf r=\mathbf y-\mathbf x\ne\mathbf 0$; then $\mathbf a+2\mathbf r=2\mathbf y-\mathbf x=-\mathbf y-\mathbf x=\mathbf z$, using $2=-1$ in $\mathbb F_3$. For the last assertion, if $\mathbf x=\mathbf y$ then $\mathbf z=-2\mathbf x=\mathbf x$. ∎

Thus $A$ is a cap set iff the only solutions of $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$ with $\mathbf x,\mathbf y,\mathbf z\in A$ are the trivial ones $\mathbf x=\mathbf y=\mathbf z$.

Let $r(n)$ be the largest size of a cap set in $\mathbb F_3^n$. The trivial bounds are $2^n\le r(n)\le3^n$ (the lower bound from $\{0,1\}^n$, §6.5). Meshulam (1995) proved $r(n)=O(3^n/n)$ by adapting Roth's Fourier argument, and Bateman and Katz (2012) improved this to $O(3^n/n^{1+\varepsilon})$ with considerable effort. Whether $r(n)\le(3-\delta)^n$ for some $\delta>0$ was a well-known open problem until Croot, Lev, and Pach (2017) proved the analogous statement for $\mathbb Z_4^n$ in May 2016 and Ellenberg and Gijswijt (2017) adapted their argument to $\mathbb F_q^n$ within days. The proof below follows the symmetric formulation of Tao (2016).

## 6.2 The diagonal matrix

Let $V_d$ denote the space of *reduced* polynomials in $\mathbb F_3[x_1,\dots,x_n]$ of degree at most $d$, i.e. linear combinations of monomials $\mathbf x^{\boldsymbol\alpha}$ with $\boldsymbol\alpha\in\{0,1,2\}^n$ and $|\boldsymbol\alpha|\le d$. Its dimension is
$$m_d=\#\{\boldsymbol\alpha\in\{0,1,2\}^n:\ |\boldsymbol\alpha|\le d\},$$
with $m_d=0$ for $d<0$ and $m_d=3^n$ for $d\ge2n$. The set of reduced monomials is closed under division, so Lemma 2.10 applies to $V_d$ with $M_e=m_e$.

**Lemma 6.3 (Symmetry).** *For every integer $d$, $3^n-m_d=m_{2n-d-1}$.*

*Proof.* The map $\boldsymbol\alpha\mapsto(2,\dots,2)-\boldsymbol\alpha$ is a bijection of $\{0,1,2\}^n$ sending $|\boldsymbol\alpha|$ to $2n-|\boldsymbol\alpha|$; it carries $\{|\boldsymbol\alpha|\ge d+1\}$ onto $\{|\boldsymbol\alpha|\le2n-d-1\}$. ∎

**Lemma 6.4.** *Let $A\subseteq\mathbb F_3^n$ be a cap set and let $P\in\mathbb F_3[\mathbf x]$ vanish at every point of $\mathbb F_3^n\setminus(-A)$, where $-A=\{-\mathbf a:\mathbf a\in A\}$. Then the matrix $M=\big(P(\mathbf x+\mathbf y)\big)_{\mathbf x,\mathbf y\in A}$ is diagonal, with diagonal entries $M_{\mathbf x\mathbf x}=P(-\mathbf x)$.*

*Proof.* Let $\mathbf x\ne\mathbf y$ in $A$. If $\mathbf x+\mathbf y\in-A$, say $\mathbf x+\mathbf y=-\mathbf z$ with $\mathbf z\in A$, then $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$ with $\mathbf x\ne\mathbf y$, so by Lemma 6.2 the three points are distinct and collinear, contradicting that $A$ is a cap set. Hence $\mathbf x+\mathbf y\notin-A$ and $P(\mathbf x+\mathbf y)=0$. On the diagonal, $\mathbf x+\mathbf x=2\mathbf x=-\mathbf x$. ∎

## 6.3 The Ellenberg–Gijswijt bound

**Theorem 6.5 (Ellenberg and Gijswijt 2017; per-degree form).** *Let $A\subseteq\mathbb F_3^n$ be a cap set. Then for every integer $d$ with $0\le d\le2n$,*
$$|A|\le m_{2n-d-1}+m_{\lfloor d/2\rfloor}+m_{\lceil d/2\rceil-1}\le m_{2n-d-1}+2m_{\lfloor d/2\rfloor}.$$

*Proof.* Let $W\subseteq V_d$ be the subspace of reduced polynomials of degree at most $d$ that vanish at every point of $\mathbb F_3^n\setminus(-A)$. Vanishing at a point is one linear condition, and there are $3^n-|A|$ points, so
$$\dim W\ge m_d-(3^n-|A|)=|A|-m_{2n-d-1}$$
by Lemma 6.3. Consider the evaluation map $W\to\mathbb F_3^{-A}$, $P\mapsto(P(\mathbf u))_{\mathbf u\in-A}$. It is injective: a $P\in W$ in its kernel vanishes on $-A$ and on the complement of $-A$, hence on all of $\mathbb F_3^n$, hence is zero by Lemma 2.1(b) since $P$ is reduced. So the image is a subspace of $\mathbb F_3^{-A}$ of dimension $\dim W$, and by Lemma 2.11 there is $P\in W$ with $P(\mathbf u)\ne0$ for at least $\dim W$ points $\mathbf u\in-A$.

By Lemma 6.4 the matrix $M=(P(\mathbf x+\mathbf y))_{\mathbf x,\mathbf y\in A}$ is diagonal with entries $P(-\mathbf x)$, so
$$\operatorname{rank}M=\#\{\mathbf x\in A:P(-\mathbf x)\ne0\}=\#\{\mathbf u\in-A:P(\mathbf u)\ne0\}\ge\dim W\ge|A|-m_{2n-d-1}.$$
By Lemma 2.10, $\operatorname{rank}M\le m_{\lfloor d/2\rfloor}+m_{\lceil d/2\rceil-1}$. Combining the two inequalities gives the theorem. ∎

**Corollary 6.6 (Ellenberg and Gijswijt 2017).** *Every cap set $A\subseteq\mathbb F_3^n$ satisfies $|A|\le3\,m_{\lfloor2n/3\rfloor}$.*

*Proof.* Put $D=\lfloor2n/3\rfloor$ and $d=2n-1-D$ in Theorem 6.5, so that $2n-d-1=D$. It remains to check $\lfloor d/2\rfloor\le D$ and $\lceil d/2\rceil-1\le D$, since $m_e$ is nondecreasing in $e$. Write $n=3k+r$ with $r\in\{0,1,2\}$. If $r=0$: $D=2k$, $d=4k-1$, $\lfloor d/2\rfloor=\lceil d/2\rceil-1=2k-1$. If $r=1$: $D=2k$, $d=4k+1$, both quantities equal $2k$. If $r=2$: $D=2k+1$, $d=4k+2$, $\lfloor d/2\rfloor=2k+1$ and $\lceil d/2\rceil-1=2k$. In every case both are at most $D$, so $|A|\le m_D+m_D+m_D$. ∎

**Remark 6.7.** The per-degree form is slightly sharper than the corollary in small dimensions. The values of $\min_d\big(m_{2n-d-1}+m_{\lfloor d/2\rfloor}+m_{\lceil d/2\rceil-1}\big)$ and of $3m_{\lfloor2n/3\rfloor}$ for $n\le12$ are tabulated in Appendix A (Table A.4); for $n=6$ they are $324$ and $504$, against the true value $r(6)=112$. The two coincide when $n\equiv1\pmod3$. Asymptotically the difference is a constant factor and does not affect the base of the exponential.

## 6.4 The constant

**Lemma 6.8.** *For every $t\in(0,1]$ and every $D\le2n/3$,*
$$m_D\le t^{-2n/3}(1+t+t^2)^n.$$

*Proof.* Since $t\le1$, for every $\boldsymbol\alpha$ with $|\boldsymbol\alpha|\le D$ we have $t^{|\boldsymbol\alpha|}\ge t^{D}\ge t^{2n/3}$. Hence
$$m_D=\sum_{|\boldsymbol\alpha|\le D}1\le t^{-2n/3}\sum_{|\boldsymbol\alpha|\le D}t^{|\boldsymbol\alpha|}\le t^{-2n/3}\sum_{\boldsymbol\alpha\in\{0,1,2\}^n}t^{|\boldsymbol\alpha|}=t^{-2n/3}(1+t+t^2)^n.\qquad\blacksquare$$

**Theorem 6.9.** *Every cap set $A\subseteq\mathbb F_3^n$ satisfies $|A|\le3c^n$, where*
$$c=\min_{0<t\le1}\frac{1+t+t^2}{t^{2/3}}=\frac{1+t_0+t_0^2}{t_0^{2/3}},\qquad t_0=\frac{\sqrt{33}-1}{8}=0.59307\ldots,\qquad c=2.755105\ldots$$

*Proof.* By Corollary 6.6 and Lemma 6.8, $|A|\le3\big(t^{-2/3}(1+t+t^2)\big)^n$ for every $t\in(0,1]$. Let $g(t)=\ln(1+t+t^2)-\tfrac23\ln t$ on $(0,1]$. Then
$$g'(t)=\frac{1+2t}{1+t+t^2}-\frac{2}{3t}=\frac{3t(1+2t)-2(1+t+t^2)}{3t(1+t+t^2)}=\frac{4t^2+t-2}{3t(1+t+t^2)},$$
which is negative for $0<t<t_0$ and positive for $t_0<t\le1$, where $t_0=(\sqrt{33}-1)/8$ is the positive root of $4t^2+t-2$. So $g$ has its minimum on $(0,1]$ at $t_0$, and $c=e^{g(t_0)}$. Numerically $t_0=0.593070\ldots$, $1+t_0+t_0^2=1.944803\ldots$, $t_0^{-2/3}=1.416638\ldots$, and $c=2.755105\ldots$ ∎

**Remark 6.10.** The bound of Lemma 6.8 is the Chernoff bound for the number of $\boldsymbol\alpha$ with $|\boldsymbol\alpha|\le2n/3$, and standard local limit estimates show it is sharp up to a factor $\Theta(\sqrt n)$: $m_{\lfloor2n/3\rfloor}=c^n\,\Theta(n^{-1/2})$. So Corollary 6.6 is $\Theta(c^n/\sqrt n)$ and the exponential base $c$ is exactly what the argument gives; the choice of $d$ in Corollary 6.6 is asymptotically optimal among all choices in Theorem 6.5, since $m_{2n-d-1}$ and $m_{d/2}$ are balanced precisely at $d\approx4n/3$. It is known that the base $c$ cannot be improved by the slice-rank method alone (Blasiak et al. 2017; Tao 2016).

## 6.5 Constructions and small cases

**Lemma 6.11.** *$\{0,1\}^n$ is a cap set in $\mathbb F_3^n$, so $r(n)\ge2^n$. If $A\subseteq\mathbb F_3^a$ and $B\subseteq\mathbb F_3^b$ are cap sets, so is $A\times B\subseteq\mathbb F_3^{a+b}$; hence $r(a+b)\ge r(a)r(b)$.*

*Proof.* If $\mathbf x,\mathbf y,\mathbf z\in\{0,1\}^n$ satisfy $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$, then in each coordinate $x_i+y_i+z_i\in\{0,1,2,3\}$ is divisible by $3$, so it is $0$ or $3$, so $x_i=y_i=z_i$; thus $\mathbf x=\mathbf y=\mathbf z$ and the solution is trivial. For the product, suppose $(\mathbf a_j,\mathbf b_j)\in A\times B$ ($j=1,2,3$) are distinct with zero sum. Then $\mathbf a_1+\mathbf a_2+\mathbf a_3=\mathbf 0$ and $\mathbf b_1+\mathbf b_2+\mathbf b_3=\mathbf 0$. By Lemma 6.2 each of these triples is either all-equal or all-distinct; an all-distinct triple would be three collinear points of $A$ or of $B$, so both triples are all-equal, and then the three pairs coincide, a contradiction. ∎

The product construction from the known small values gives $r(n)\ge112^{n/6}\approx2.1955^n$. Edel (2004) obtained $2.2174^n$ by a more elaborate product of caps in $\mathbb F_3^{62}$ and $\mathbb F_3^{480}$, Tyrrell (2023) improved this to $2.218^n$, and a computer search guided by a language model (Romera-Paredes et al. 2024) found constructions giving $2.2202^n$. The exact values of $r(n)$ are known for $n\le6$:

| $n$ | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| $r(n)$ | 2 | 4 | 9 | 20 | 45 | 112 |
| $2^n$ | 2 | 4 | 8 | 16 | 32 | 64 |
| Theorem 6.5, best $d$ | 3 | 7 | 18 | 45 | 123 | 324 |
| Corollary 6.6 | 3 | 9 | 30 | 45 | 153 | 504 |
| $3^n$ | 3 | 9 | 27 | 81 | 243 | 729 |

The values $r(n)$ for $n\le5$ are surveyed by Bierbrauer and Edel (2002) and Edel, Ferret, Landjev, and Storme (2002); $r(6)=112$ is due to Potechin (2008). The values for $n\le3$ were reproduced by exhaustive search (Appendix A), and for $n=4$ the search found a cap of size $20$ without completing (Table A.3). The gap between the polynomial bound and the truth is a factor of about three at $n=6$, and it grows like $(c/2.2202)^n\approx1.24^n$ if the best constructions are near the truth.

## 6.6 Beyond $\mathbb F_3$

Ellenberg and Gijswijt prove the analogous bound over every finite field: for $q=p^k$ and $A\subseteq\mathbb F_q^n$ containing no three-term progression $\mathbf x,\mathbf x+\mathbf r,\mathbf x+2\mathbf r$ with $\mathbf r\ne\mathbf 0$, $|A|\le c_q^{\,n}$ for an explicit $c_q<q$. For odd $q$ the proof above transfers with one change: a progression is a solution of $\mathbf x+\mathbf z=2\mathbf y$, so one takes $P$ vanishing outside $2A$ instead of $-A$; the matrix $(P(\mathbf x+\mathbf z))_{\mathbf x,\mathbf z\in A}$ is then diagonal with entries $P(2\mathbf x)$, reduced polynomials have exponents in $\{0,\dots,q-1\}$, $m_d$ counts $\boldsymbol\alpha\in\{0,\dots,q-1\}^n$ with $|\boldsymbol\alpha|\le d$, and Lemma 6.3 becomes $q^n-m_d=m_{(q-1)n-d-1}$. The optimal $d$ is about $\tfrac23(q-1)n$ and the constant is $c_q=\min_{0<t\le1}t^{-(q-1)/3}(1+t+\dots+t^{q-1})$. In characteristic $2$ the equation $\mathbf x+\mathbf z=2\mathbf y$ degenerates and a different encoding is needed; Croot, Lev, and Pach's original argument for $\mathbb Z_4^n$ and Ellenberg and Gijswijt's treatment of $\mathbb F_{2^k}$ handle it, and I do not reproduce them.

The wider significance of the argument is that it bounds not only cap sets but the rank of a three-variable tensor, the indicator of $\mathbf x+\mathbf y+\mathbf z=\mathbf 0$, in the sense of *slice rank* introduced by Tao (2016); any set on which such a tensor is diagonal with nonzero diagonal has size at most the slice rank. This reformulation has since been applied to sunflower-free sets, to the group-theoretic approach to matrix multiplication (Blasiak et al. 2017), and elsewhere. The three-lemma architecture of this dissertation covers it exactly: the slice rank bound is Lemma 2.10, the diagonal structure is the bridge, and the counting is the dimension of $V_d$.
# Chapter 7. A New Result: Punctured Kakeya Sets in the Plane

This chapter contains the dissertation's one claim to new mathematics. It determines, for every odd prime power $q$, the minimum size of a subset of $\mathbb F_q^2$ that contains *all but at most one point* of some line in every direction, and it determines the same quantity for even $q$ up to an additive constant, exactly for $q\le8$. The answer is $\lfloor q^2/2\rfloor$ for odd $q$ and $q^2/2-1$ for $q=4$ and $q=8$; the polynomial method (Corollary 4.3) gives $\binom{q}{2}=q^2/2-q/2$, so the chapter also measures precisely how far the polynomial bound is from the truth for this variant of the Kakeya problem: by $(q-1)/2$.

I have searched the literature and have not found this quantity studied before; the closest relatives are the exact solution of the unpunctured problem by Blokhuis and Mazzocca (2008), the finite-field Furstenberg sets of Ellenberg and Erman (2016), of which the sets studied here are the special case $(k,m)=(1,q-1)$ in the plane, and the fixed-line-set variant of Ball, Blokhuis, and Domenzain (2016). The proofs below depend on one classical theorem, the Blokhuis–Mazzocca classification of minimal Kakeya sets for odd $q$, which I cite and do not reprove; the statements that depend on it are marked. Everything else is proved in full, and every statement has been checked by exhaustive computation for $q\le9$ (§7.6 and Appendix A.6).

## 7.1 Definitions and results

Blokhuis and Mazzocca define a Kakeya set in $AG(2,q)$ as the union of $q+1$ lines, one in each direction; a Kakeya set in the sense of Definition 4.1 contains such a union, so the minimum size $\kappa(q)$ of a Kakeya set is the minimum size of such a union. Their theorem, which the computations of §4.5 confirmed for $q\le7$, is:

**Theorem 7.A (Blokhuis and Mazzocca 2008).** *For $q$ odd, $\kappa(q)=\binom{q+1}{2}+\frac{q-1}{2}$; for $q$ even, $\kappa(q)=\binom{q+1}{2}$. For $q$ odd, every Kakeya set of size $\kappa(q)$ arises from the conic construction of Lemma 7.7 below.*

The classification statement is Blokhuis and Mazzocca's, restated by Dover and Mellinger (2014); for $q$ even, the sets of size $\binom{q+1}{2}$ are the unions of $q+1$ lines of a dual hyperoval.

**Definition 7.1.** A *punctured Kakeya set* in $\mathbb F_q^2$ is a set $K$ such that for every direction $\mathbf b\ne\mathbf 0$ there is a line $\ell$ in direction $\mathbf b$ with $|\ell\setminus K|\le1$. Let $\kappa^-(q)$ be the minimum size of a punctured Kakeya set.

In the terminology of Ellenberg and Erman (2016), a punctured Kakeya set is a $(1,q-1)$-Furstenberg set in $\mathbb F_q^2$. Corollary 4.3 with $k=q-1$ gives $\kappa^-(q)\ge\binom{q}{2}$. The results of this chapter are the following.

**Theorem 7.2.** *For every odd prime power $q\ge3$,*
$$\kappa^-(q)=\frac{q^2-1}{2}.$$

**Theorem 7.3.** *For every even prime power $q\ge4$,*
$$\frac{q^2}{2}-\Big\lceil\frac{q+1}{6}\Big\rceil\ \le\ \kappa^-(q)\ \le\ \frac{q^2}{2}-1,$$
*with equality on the right for $q=4$ and $q=8$. If every union of $q+1$ lines in distinct directions that is not of minimum size has at least $\binom{q+1}{2}+\frac q2$ points (the gap property, discussed in §7.5), then $\kappa^-(q)=q^2/2-1$ for every even $q\ge4$.*

The exact values for small $q$ are:

| $q$ | 3 | 4 | 5 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|
| $\kappa(q)$ | 7 | 10 | 17 | 31 | 36 | 49 |
| $\kappa^-(q)$ | 4 | 7 | 12 | 24 | 31 | 40 |
| Dvir, $\binom{q}{2}$ | 3 | 6 | 10 | 21 | 28 | 36 |
| $\lfloor q^2/2\rfloor$ | 4 | 8 | 12 | 24 | 32 | 40 |

The proof of Theorem 7.2 uses Theorem 7.A, including the classification; the proof of the upper bound in Theorem 7.3 uses only the existence of ovals; the proof of the lower bound in Theorem 7.3 uses nothing beyond counting. The method is not the polynomial method. It is inclusion–exclusion, sharpened by a matching argument, and its interest for this dissertation is exactly that it shows what the polynomial method leaves on the table in the plane.

## 7.2 Unions of lines in distinct directions

Fix $q+1$ lines $\ell_b$, one in each direction $b$, and let $U=\bigcup_b\ell_b$. For a point $P\in\mathbb F_q^2$ let $m_P$ be the number of the lines $\ell_b$ through $P$, and let $n_k=\#\{P:m_P=k\}$. Call $P$ *simple* if $m_P=1$, *double* if $m_P=2$, and *multiple* if $m_P\ge3$.

**Lemma 7.4 (Exact size).** *With $E=\sum_P\binom{m_P-1}{2}=\sum_{k\ge3}\binom{k-1}{2}n_k$,*
$$|U|=\binom{q+1}{2}+E.$$

*Proof.* Two lines in distinct directions meet in exactly one point, so $\sum_P\binom{m_P}{2}=\binom{q+1}{2}$; and $\sum_Pm_P=q(q+1)$ since each line has $q$ points. Hence
$$|U|=\sum_{P\in U}1=\sum_{P\in U}\Big[m_P-\binom{m_P}{2}+\binom{m_P-1}{2}\Big]=q(q+1)-\binom{q+1}{2}+E=\binom{q+1}{2}+E,$$
using the identity $1=m-\binom m2+\binom{m-1}{2}$ for $m\ge1$. ∎

The inequality $|U|\ge\binom{q+1}{2}$ is Bonferroni's inequality $|\bigcup A_i|\ge\sum|A_i|-\sum_{i<j}|A_i\cap A_j|$, and it coincides with Dvir's bound $\binom{q+n-1}{n}$ for $n=2$. Theorem 7.A says that $E\ge(q-1)/2$ for odd $q$, and that $E=0$ is attained for even $q$.

**Lemma 7.5 (Line identities).** *For each line $\ell=\ell_b$, let $t_\ell$ be the number of simple points on $\ell$. Then*
$$\sum_{P\in\ell}(m_P-1)=q,\qquad t_\ell=\sum_{P\in\ell,\ m_P\ge2}(m_P-2).$$
*Consequently: (a) a line carrying a simple point passes through a multiple point; (b) a line carrying no simple point consists of double points only; (c) $n_1=\sum_{k\ge3}k(k-2)\,n_k$; (d) for every line $M$ that is not one of the $\ell_b$, $\sum_{P\in M}m_P=q$.*

*Proof.* Each of the other $q$ lines meets $\ell$ in exactly one point, which gives the first identity. In it, the $t_\ell$ simple points contribute $0$ and the remaining $q-t_\ell$ points contribute $m_P-1\ge1$ each, so $\sum_{P\in\ell,m_P\ge2}(m_P-2)=q-(q-t_\ell)=t_\ell$, the second identity. (a) and (b) are immediate from the second identity. (c) follows by summing the second identity over all lines: the left side gives $n_1$, and a point of multiplicity $k\ge2$ is counted on $k$ lines with weight $k-2$. (d) holds because $M$ is parallel to exactly one $\ell_b$ and meets the other $q$ lines once each. ∎

## 7.3 Reduction to a matching problem

**Lemma 7.6.** *Let $K$ be a punctured Kakeya set. Then there are lines $\ell_b$, one per direction, and a set $X$ of points of $U=\bigcup\ell_b$ such that no two points of $X$ lie on a common line $\ell_b$, and $|K|\ge|U|-|X|$. Conversely, for any such $U$ and $X$, $U\setminus X$ is a punctured Kakeya set. Hence*
$$\kappa^-(q)=\min\big(|U|-\nu\big),$$
*where the minimum is over all choices of one line per direction and $\nu=\nu(U)$ is the largest size of a set of points of $U$ no two of which lie on a common line $\ell_b$.*

*Proof.* For each direction choose a line $\ell_b$ with $|\ell_b\setminus K|\le1$, and a point $x_b\in\ell_b$ with $\ell_b\setminus\{x_b\}\subseteq K$ (any point of $\ell_b$ if $\ell_b\subseteq K$). Then $K\supseteq\bigcup_b(\ell_b\setminus\{x_b\})=U\setminus X$, where $X$ is the set of points $x$ such that $x=x_b$ for *every* $b$ with $x\in\ell_b$: a point of $U$ is omitted only if it is the chosen puncture of each line through it. Each line has one puncture, so two points of $X$ cannot share a line. Conversely, given $X$ with no two points on a common line, puncture each line at its point of $X$ if it has one, and anywhere otherwise; then $U\setminus X$ contains $q$ points of each line. ∎

In the language of hypergraphs, $\nu$ is the matching number of the hypergraph whose vertices are the $q+1$ lines and whose edges are the points of $U$, each point being the set of lines through it. Every pair of vertices lies in exactly one edge.

**Lemma 7.7 (Matching bound).** *Let $s$ be the number of lines $\ell_b$ that carry at least one simple point. Then*
$$\nu\le\Big\lfloor\frac{q+1+s}{2}\Big\rfloor.$$

*Proof.* Let $X$ be a set of points of $U$ no two on a common line, and let $x_k$ be the number of points of $X$ of multiplicity $k$. Two simple points on the same line would share it, so $x_1\le s$. Each point of multiplicity $k$ uses $k$ lines and the line sets are disjoint, so $x_1+\sum_{k\ge2}kx_k\le q+1$, whence $\sum_{k\ge2}x_k\le(q+1-x_1)/2$ and
$$|X|=x_1+\sum_{k\ge2}x_k\le x_1+\frac{q+1-x_1}{2}=\frac{q+1+x_1}{2}\le\frac{q+1+s}{2}.\qquad∎$$

Lemmas 7.4, 7.6, and 7.7 give, for every configuration,
$$|U|-\nu\ \ge\ \binom{q+1}{2}+E-\Big\lfloor\frac{q+1+s}{2}\Big\rfloor,\tag{7.1}$$
and everything that follows is an analysis of the right-hand side.

## 7.4 Odd $q$

**Lemma 7.8 (The conic configuration).** *Let $q$ be odd, let $C$ be a conic in $PG(2,q)$, let $T\in C$, and take the tangent line $L$ at $T$ as the line at infinity. Let the chosen lines be the $q$ tangent lines $\ell_R$ at the points $R\in C\setminus\{T\}$, together with one line $m$ through $T$ other than $L$, which meets $C$ again at a point $T'$. Then:*

*(i) the $q+1$ lines have distinct directions;*
*(ii) $E=(q-1)/2$, the multiple points being the $(q-1)/2$ external points of $C$ on $m$, each of multiplicity $3$;*
*(iii) for $R\ne T'$ the line $\ell_R$ carries exactly one simple point, namely $R$; the line $m$ carries $(q-1)/2$ simple points, the internal points of $C$ on $m$; and the line $\ell_{T'}$ carries no simple point;*
*(iv) puncturing $\ell_R$ at $R$ for each $R\ne T'$ and $m$ at one internal point yields a punctured Kakeya set of size $(q^2-1)/2$.*

*Proof.* We use the standard facts about conics for $q$ odd (Hirschfeld 1998, ch. 8): every point not on $C$ lies on either $0$ tangents (an *internal* point) or $2$ tangents (an *external* point); every point of a tangent line other than its point of contact is external; and a secant line contains, besides its two points of $C$, exactly $(q-1)/2$ external and $(q-1)/2$ internal points.

(i) Each $\ell_R$ meets $L$ in an external point of $L$, and each external point of $L$ lies on exactly one tangent other than $L$; so $R\mapsto\ell_R\cap L$ is a bijection from $C\setminus\{T\}$ onto $L\setminus\{T\}$, and the $q$ tangents have $q$ distinct directions, none of them $T$; the line $m$ has direction $T$.

(ii) A point of $\mathbb F_q^2=PG(2,q)\setminus L$ lies on $\ell_R$ iff it is $R$ or an external point on $\ell_R$. So the affine points of $C$ have $m_P=1$ from the tangents, the affine external points have $m_P=2$ from the tangents, and the affine internal points have $m_P=0$ from the tangents; the line $m$ adds $1$ to each of its affine points. The affine points of $m$ are $T'$, $(q-1)/2$ external points, and $(q-1)/2$ internal points. Hence the multiplicities are: $T'$ and the external points off $m$ have $m_P=2$; the external points on $m$ have $m_P=3$; the affine points of $C$ other than $T'$ and the internal points on $m$ have $m_P=1$. So $E=\binom{2}{2}\cdot\frac{q-1}{2}=\frac{q-1}{2}$.

(iii) follows from the list in (ii): the simple points are the $q-1$ points $R\in C\setminus\{T,T'\}$, each on its own tangent, and the $(q-1)/2$ internal points of $m$. The line $\ell_{T'}$ consists of $T'$ and external points, all of multiplicity $2$.

(iv) The $q$ punctures are simple points on $q$ distinct lines, so by Lemma 7.6 the result is a punctured Kakeya set of size $|U|-q=\binom{q+1}{2}+\frac{q-1}{2}-q=\frac{q^2-1}{2}$. ∎

*Proof of Theorem 7.2.* The upper bound is Lemma 7.8(iv). For the lower bound let $K$ be a punctured Kakeya set and let $U$, $X$, $E$, $s$ be as in §7.3, so that $|K|\ge|U|-\nu$ and (7.1) applies. By Theorem 7.A, $E\ge(q-1)/2$.

If $E\ge(q+1)/2$, then, using only $\nu\le q+1$,
$$|K|\ge\binom{q+1}{2}+\frac{q+1}{2}-(q+1)=\frac{q^2-1}{2}.$$

If $E=(q-1)/2$, then by the classification in Theorem 7.A the configuration is the conic configuration of Lemma 7.8, in which by (iii) the line $\ell_{T'}$ carries no simple point, so $s\le q$ and Lemma 7.7 gives $\nu\le\lfloor(2q+1)/2\rfloor=q$. Hence
$$|K|\ge\binom{q+1}{2}+\frac{q-1}{2}-q=\frac{q^2-1}{2}.\qquad∎$$

**Remark 7.9.** The classification is used only to gain one point. Without it, Theorem 7.A's bound $E\ge(q-1)/2$ together with $\nu\le q+1$ gives $\kappa^-(q)\ge(q^2-3)/2$ for odd $q\ge5$. Since the computations of §7.6 show that for $q\in\{3,5,7,9\}$ every configuration with $E=(q-1)/2$ has a line without simple points, Theorem 7.2 holds for those $q$ independently of the classification.

**Remark 7.10.** For $q=5$ and $q=7$ the minimum $(q^2-1)/2$ is also attained by a second family of configurations, with $E=(q+1)/2$, all $(q+1)/2$ multiple points triple, not all on one line, and every line carrying a simple point, so that $\nu=q+1$ (§7.6). For $q=9$ no configuration with $E=5$ exists at all: the values of $E$ that occur are $4$ and then $6$ upward.

## 7.5 Even $q$

**Lemma 7.11 (The dual oval configuration).** *Let $q\ge4$ be even and let $\mathcal D$ be a dual oval in $PG(2,q)$: a set of $q+1$ lines no three of which are concurrent (for instance the lines $R^\ast$ dual to the points $R$ of a conic). Let $N^\ast$ be its nucleus line, the line consisting of the points that lie on exactly one line of $\mathcal D$. Choose a line $O^\ast\in\mathcal D$ as the line at infinity, let $Z=O^\ast\cap N^\ast$, and let $m$ be any line through $Z$ other than $O^\ast$ and $N^\ast$. Let the chosen lines be the $q$ lines of $\mathcal D\setminus\{O^\ast\}$ together with $m$. Then the lines have distinct directions, $E=q/2$ with all multiple points triple and on $m$, and every line carries a simple point. Consequently $\nu=q+1$ and*
$$\kappa^-(q)\le\binom{q+1}{2}+\frac q2-(q+1)=\frac{q^2}{2}-1.$$

*Proof.* The facts used are the duals of the standard facts about ovals for $q$ even (Hirschfeld 1998, ch. 8): the $q+1$ tangents of an oval $\mathcal O$ are concurrent at its nucleus $N$, every line through $N$ is a tangent, and every line not through $N$ meets $\mathcal O$ in $0$ or $2$ points. Dualising, the points on exactly one line of $\mathcal D$ are exactly the points of a line $N^\ast$, and every point not on $N^\ast$ lies on $0$ or $2$ lines of $\mathcal D$.

*Directions.* Two lines of $\mathcal D$ meet in a point on no third line of $\mathcal D$; in particular the $q$ lines of $\mathcal D\setminus\{O^\ast\}$ meet $O^\ast$ in $q$ distinct points, so they are affine lines in $q$ distinct directions, and their pairwise intersections are affine. The point $Z\in O^\ast$ lies on $N^\ast$, hence on exactly one line of $\mathcal D$, which is $O^\ast$; so no line of $\mathcal D\setminus\{O^\ast\}$ has direction $Z$, and $m$, which has direction $Z$, supplies the missing direction.

*Multiplicities.* The $q$ affine lines of $\mathcal D$ pairwise meet in $\binom q2$ distinct affine points, each of multiplicity $2$ among them. The line $m$ is parallel to $N^\ast$ and distinct from it, so its affine points lie off $N^\ast$ and each lies on $0$ or $2$ of the $q$ lines; since $m$ meets each of the $q$ lines once, exactly $q/2$ points of $m$ lie on two of them and $q/2$ on none. Thus $m$ raises $q/2$ double points to triple points and contributes $q/2$ simple points, and $E=q/2$.

*Simple points on every line.* For a line $R^\ast\in\mathcal D\setminus\{O^\ast\}$, the point $R^\ast\cap N^\ast$ is affine (it is not $Z$, since $Z$ is on $O^\ast$ only), lies on exactly one line of $\mathcal D$, and is not on $m$ (which meets $N^\ast$ only at $Z$); so it is a simple point of $R^\ast$. The line $m$ carries its $q/2$ simple points. So $s=q+1$, and choosing one simple point on each line gives $\nu=q+1$. The size follows from Lemma 7.4. ∎

**Lemma 7.12.** *In every configuration, $s\le3E$.*

*Proof.* By Lemma 7.5(a), every line carrying a simple point passes through a multiple point; a point of multiplicity $k\ge3$ lies on $k$ lines; and $k\le3\binom{k-1}{2}$ for $k\ge3$. Hence $s\le\sum_{k\ge3}kn_k\le3\sum_{k\ge3}\binom{k-1}{2}n_k=3E$. ∎

*Proof of Theorem 7.3.* The upper bound is Lemma 7.11. For the lower bound, apply (7.1) with Lemma 7.12; write $q+1$ odd. If $E=0$ then $s=0$, $\nu\le q/2$, and $|U|-\nu\ge\binom{q+1}{2}-q/2=q^2/2$. If $1\le E$ and $3E\le q+1$, then
$$|U|-\nu\ \ge\ \binom{q+1}{2}+E-\frac{q+1+3E}{2}=\frac{q^2-1}{2}-\frac E2,$$
so, the left side being an integer, $|U|-\nu\ge q^2/2-\lceil E/2\rceil\ge q^2/2-\lceil(q+1)/6\rceil$. If $3E\ge q+1$, then with $\nu\le q+1$,
$$|U|-\nu\ \ge\ \binom{q+1}{2}-(q+1)+E\ \ge\ \frac{q^2-q-2}{2}+\frac{q+1}{3}=\frac{q^2}{2}-\frac{q+4}{6},$$
so $|U|-\nu\ge q^2/2-\lfloor(q+4)/6\rfloor$, and $\lfloor(q+4)/6\rfloor=\lceil(q+1)/6\rceil$ because $q$, a power of $2$, is $2$ or $4$ modulo $6$. The values for $q=4$ and $q=8$ are from the exhaustive computation of §7.6; note that for $q=4$ the lower bound $8-1=7$ already matches.

For the conditional statement: if every configuration with $E>0$ has $E\ge q/2$, then in the case $E>0$ we have $3E\ge q+1$ and $|U|-\nu\ge\binom{q+1}{2}-(q+1)+\frac q2=\frac{q^2}{2}-1$, while $E=0$ gives $q^2/2$. ∎

**The gap property.** The hypothesis of the conditional statement is that the sizes of unions of $q+1$ lines in distinct directions, for $q$ even, have a gap: $\binom{q+1}{2}$ occurs, and nothing else below $\binom{q+1}{2}+q/2$. The computations of §7.6 verify this for $q=4$ (the values of $E$ that occur begin $0,2,3,\dots$) and $q=8$ (they begin $0,4,6,\dots$). Blokhuis, De Boeck, Mazzocca, and Storme (2014) study exactly the spectrum of sizes of Kakeya sets for even $q$, prove a gap above the minimum, and classify the smallest examples; I have not been able to consult their paper and cannot quote the precise threshold, so I state the result of this chapter for even $q$ as conditional on the gap property rather than as a theorem. If their gap is the one the computations suggest, Theorem 7.3 gives $\kappa^-(q)=q^2/2-1$ for all even $q\ge4$.

**Conjecture 7.13.** $\kappa^-(q)=q^2/2-1$ for every even $q\ge4$.

## 7.6 Computations

All configurations of $q+1$ lines, one per direction, were enumerated for $q\le9$, up to translation (the lines in directions $(1,0)$ and $(0,1)$ can be fixed), and for each the multiplicities, $E$, $s$, and the matching number $\nu$ (by dynamic programming over subsets of the $q+1$ lines) were computed. The program is listed in Appendix A.6. The findings:

| $q$ | configurations | values of $E$ that occur (smallest first) | $E_{\min}$ | max $s$ at $E_{\min}$ | $\min(\lvert U\rvert-\nu)$ |
|---|---|---|---|---|---|
| 3 | 9 | 1, 3 | 1 | 3 | 4 |
| 4 | 64 | 0, 2, 3, 6 | 0 | 0 | 7 |
| 5 | 625 | 2, 3, 4, 6, 10 | 2 | 5 | 12 |
| 7 | 117,649 | 3, 4, 5, 6, 7, 8, 9, 11, 15, 21 | 3 | 7 | 24 |
| 8 | 2,097,152 | 0, 4, 6, 7, 8, 9, 10, 11, 12, 13, 16, 21, … | 0 | 0 | 31 |
| 9 | 43,046,721 | 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, … | 4 | 9 | 40 |

Three things in the table are the facts the proofs use. The column $E_{\min}$ is Theorem 7.A. The column "max $s$ at $E_{\min}$" equals $q$ for every odd $q\le9$, which is the consequence of the classification used in the proof of Theorem 7.2, verified directly. And for $q=4,8$ the second value of $E$ is $q/2$, which is the gap property.

The extremal configurations have the following multiplicity distributions $(n_1,n_2,n_3)$, with all multiple points triple:

| $q$ | $E$ | $(n_1,n_2,n_3)$ | multiple points on one line | $s$ | $\nu$ | $\lvert U\rvert-\nu$ | number |
|---|---|---|---|---|---|---|---|
| 4 | 2 | (6, 4, 2) | yes | 5 | 5 | 7 | 45 |
| 5 | 2 | (6, 9, 2) | yes | 5 | 5 | 12 | 120 |
| 5 | 3 | (9, 6, 3) | no | 6 | 6 | 12 | 160 |
| 7 | 3 | (9, 19, 3) | yes | 7 | 7 | 24 | 336 |
| 7 | 4 | (12, 16, 4) | no | 8 | 8 | 24 | 2016 |
| 8 | 4 | (12, 24, 4) | yes | 9 | 9 | 31 | 4410 |
| 9 | 4 | (12, 33, 4) | yes | 9 | 9 | 40 | 720 |

The rows with "yes" are the conic configuration (odd $q$) and the dual oval configuration (even $q$) of Lemmas 7.8 and 7.11: $(q\mp1)/2$ or $q/2$ triple points on one line, $q-1$ simple points on the other lines and the rest on that line. The rows with "no" are the second odd family of Remark 7.10.

## 7.7 Discussion

**What is new.** The quantity $\kappa^-(q)$, the reduction of Lemma 7.6, the matching bound of Lemma 7.7, Theorem 7.2, and Theorem 7.3 with its constructions are, to the best of my knowledge, new. The ingredients are not: Lemma 7.4 is inclusion–exclusion, the conic and dual oval configurations are the classical objects of finite geometry, and the decisive input for odd $q$ is the Blokhuis–Mazzocca classification. What the chapter adds is the observation that puncturing turns the Kakeya problem into a matching problem on the line hypergraph, and that the structure theorems for the unpunctured problem then determine the punctured one.

**What it says about the polynomial method.** Corollary 4.3 gives $\kappa^-(q)\ge\binom q2$, and the truth is $\binom q2+\frac{q-1}{2}$ for odd $q$. The polynomial method loses exactly $(q-1)/2$, the same amount it loses for the unpunctured problem (§4.5). The loss has a definite source: Dvir's argument sees a punctured Kakeya set only as a set on which a polynomial of degree $q-2$ must vanish, and it cannot see that the missing points of the different lines cannot all be "used twice". The matching argument sees exactly that.

**Open questions.** (1) Prove the gap property for even $q$, or find it in Blokhuis, De Boeck, Mazzocca, and Storme (2014), and thereby settle Conjecture 7.13. (2) Determine the minimum size of a set containing $q-t$ points of a line in every direction for $2\le t\le q-2$; for $t$ close to $q$ the problem becomes that of sets determining all directions, a classical problem of a different character. (3) Determine the analogue in $\mathbb F_q^3$, where no exact result is known even for the unpunctured problem. (4) Explain the second odd family of Remark 7.10 and its absence for $q=9$.
# Chapter 8. Scope and Limits

## 8.1 What the three lemmas explain

The table of §1.2 can now be read with the proofs in hand. Each theorem of Chapters 3 to 6 is a counting step, which produces a polynomial (or, in Chapter 3, an explicit product polynomial that needs no counting), followed by a zeros step or a rank step, which shows the polynomial impossible, with one problem-specific bridge between them. The bridges are:

- *Sums of residues*: the product $\prod_{c\in C}(x+y-c)$ vanishes on $A\times B$ exactly when $C\supseteq A+B$, and a single binomial coefficient of the product is computable. The zeros step is the Nullstellensatz.
- *Kakeya*: a polynomial vanishing on a Kakeya set vanishes on a line in every direction, so its top homogeneous part vanishes at every direction, i.e. everywhere. The zeros step is Schwartz–Zippel on the grid $\mathbb F_q^n$, with multiplicity to remove the $n!$.
- *Joints*: a polynomial vanishing on many joints per line vanishes on the lines, so its gradient vanishes at the joints, so its derivatives vanish on the same set with lower degree. The zeros step is minimality of degree.
- *Cap sets*: on a cap set the matrix $P(\mathbf x+\mathbf y)$ is diagonal. The step is rank, not zeros.

Two features of this pattern deserve comment. First, the zeros step has two forms, a *grid* form (Schwartz–Zippel) and a *minimality* form (Chapter 5), and they have different domains of validity: the grid form needs a finite grid and gives bounds in terms of the field size; the minimality form works over any field and gives bounds in terms of the configuration alone, but needs the set of vanishing polynomials to be closed under a degree-lowering operation. The Kakeya problem over $\mathbb R$ has neither a grid nor such an operation, and this is why Dvir's argument does not touch it (§8.2). Second, the rank step is genuinely different from the zeros step: it does not show that the polynomial is zero, only that it has a large "effective dimension", and it therefore gives bounds of the form $c^n$ with $c<q$ rather than bounds of the form $q^n/C$. This is why the cap-set problem, where the truth is exponentially smaller than the ambient space, needed a different lemma from the Kakeya problem, where the truth is a constant fraction of it.

## 8.2 Where they stop

**No structure.** The method bounds sizes; it does not describe extremal configurations. Vosper's theorem, that equality in Cauchy–Davenport holds only for arithmetic progressions, has no polynomial proof of the kind given here, and the corresponding structural questions for the Erdős–Heilbronn bound, for Kakeya sets, and for cap sets are not answered by these arguments. The reason is visible in the proofs: the contradiction is derived from the existence of a nonzero coefficient or a nonzero polynomial, and nothing in the argument records which configurations make that coefficient vanish.

**Euclidean Kakeya.** Dvir's argument requires a polynomial vanishing on the set, and a set of Lebesgue measure zero in $\mathbb R^n$, or even a finite set of points, imposes no useful constraint on a polynomial: there is always one of degree about $|K|^{1/n}$ vanishing on any finite $K$, and a Besicovitch set is uncountable. The finite-field problem was solvable because $\mathbb F_q^n$ is a grid on which Schwartz–Zippel bites. The Euclidean conjecture remains open in dimensions four and higher; the three-dimensional case has recently been settled by Wang and Zahl (2025), by methods that go well beyond the three lemmas of this dissertation, though the polynomial partitioning of Guth and Katz (2015) and Guth (2016) plays a role in the modern theory.

**Incidence bounds over finite fields.** The Szemerédi–Trotter theorem (1983) bounds incidences between $N$ points and $N$ lines in $\mathbb R^2$ by $O(N^{4/3})$, and Guth and Katz's distinct-distances theorem rests on an incidence bound in $\mathbb R^3$ proved by polynomial partitioning. Over $\mathbb F_q$ the Szemerédi–Trotter bound is false: all $q^2$ points and all $q^2+q$ lines of $\mathbb F_q^2$ have $q^3+q^2$ incidences, far more than $N^{4/3}$. Nontrivial incidence bounds over finite fields exist (Bourgain, Katz, and Tao 2004) but rest on sum–product estimates, not on the polynomial method. Thus the method is not uniformly stronger over finite fields; it is stronger for Kakeya-type problems, where the grid structure is an asset, and weaker for incidence problems, where the topology of $\mathbb R^2$ is what the Euclidean proofs use.

**Constants.** The constants produced by the method are rarely sharp. Dvir's $1/n!$ was improved to $2^{-n}$ by multiplicities, and the truth is between $2^{-n}$ and $2^{-(n-1)}$; the joints constant $\sqrt{48}$ is a factor of about $36$ above the grid example; the cap-set base $2.7551$ is a factor of $1.24$ above the best constructions, per dimension. The one place where the method is nearly sharp is the plane Kakeya problem, where Dvir's bound is $(q-1)/2$ below the truth, an additive error in a quantity of order $q^2/2$. The lesson of the computations in Appendix A is that the method is sharp exactly when the bridge loses nothing, which in the plane means that a Kakeya set is very nearly the zero set of a polynomial of degree $q$.

**The slice-rank barrier.** For cap sets, the base $c=2.7551$ is the best that Lemma 2.10 can give, since the slice rank of the relevant tensor is $c^{n-o(n)}$ (Blasiak et al. 2017). Improving the base requires a new idea, not a sharper computation.

## 8.3 Open problems

The following are open at the time of writing, to the author's knowledge.

1. **The cap-set exponent.** $2.2202\le\limsup r(n)^{1/n}\le2.7552$. The limit $\lim r(n)^{1/n}$ exists by Lemma 6.11 and Fekete's lemma, and its value is unknown.

2. **The Kakeya constant over $\mathbb F_q$.** For fixed $n\ge3$, $\liminf_{q\to\infty}q^{-n}\min|K|$ lies in $[2^{-n},2^{-(n-1)}]$; its value is unknown, and the exact minimum $\min|K|$ is unknown for every $q$ when $n\ge3$.

3. **The joints constant.** The optimal constant in Theorem 5.5 is not determined by the argument here; the grid example gives $n^{-n/(n-1)}$ as a lower bound on it. Recent work has narrowed the gap and extended the problem from lines to varieties (Yu and Zhao 2022).

4. **Restricted sums in general groups.** Károlyi (2004) extended the Erdős–Heilbronn bound to abelian groups whose smallest prime factor is $p$; the structure of the extremal sets, and analogues for non-abelian groups, are open in general. Snevily's conjecture on Latin transversals in abelian groups of odd order was settled by Arsovski (2011) with the Nullstellensatz; Kemnitz's conjecture was settled by Reiher (2007) with Chevalley–Warning. Higher-dimensional analogues of Erdős–Ginzburg–Ziv beyond the plane are open.

5. **Euclidean Kakeya in dimension at least four.** The polynomial method as developed here does not apply, for the reason given in §8.2.

6. **The exact values of $r(n)$ for $n\ge7$.** The best lower bounds come from the constructions of Edel (2004) and their successors, the exhaustive methods of Appendix A are hopeless at $n=7$, and the best upper bound is Theorem 6.5, which at $n=7$ gives $822$ against a lower bound of a few hundred.
# Chapter 9. Conclusion

The dissertation set out to show that the polynomial method, as it has developed from Chevalley and Warning through Alon to Dvir, Guth–Katz, and Ellenberg–Gijswijt, rests on three lemmas, and that the principal theorems of the subject can be derived from those lemmas with complete proofs and explicit constants. Chapter 2 stated and proved the lemmas: counting, with and without multiplicity; zeros, in the Schwartz–Zippel, Nullstellensatz, and multiplicity forms; and rank, with the Croot–Lev–Pach expansion. Chapters 3 to 6 derived Theorems A to F from them, each chapter beginning by naming the lemmas it used and each proof identifying the problem-specific bridge. Chapter 7 proved one new theorem, on punctured Kakeya sets in the plane, by a combinatorial argument that the polynomial method does not reach, and Chapter 8 marked the boundary of what the lemmas can do.

Three conclusions may be drawn.

The first is that the method is *elementary* in a precise sense: nothing beyond the algebra of polynomials over a field and the dimension of a vector space enters any proof. The only numerical facts used are that factorials of integers less than $p$ are prime to $p$, that $\sum_{t\in\mathbb F_q}t^a$ vanishes for $0\le a<q-1$, and that $4t^2+t-2$ has root $(\sqrt{33}-1)/8$. This elementary character is what allowed Dvir's two-page paper to settle a problem on which analysts had worked for a decade, and it is what makes the method teachable: a reader with a first course in algebra can follow every step of Chapters 2 to 6.

The second is that the method's power and its limits have the same source. Its power comes from the rigidity of polynomials: a polynomial that vanishes at $q$ points of a line vanishes on the line, and a polynomial of degree less than $q$ that vanishes at every direction vanishes everywhere. Its limits come from the same rigidity: the method sees only zero sets, and when the object of interest is not close to a zero set, as a Besicovitch set in $\mathbb R^n$ is not, or when the question is about structure rather than size, the method has nothing to say. The computations in Appendix A make this concrete. In the plane Kakeya problem the bound is within $(q-1)/2$ of the truth, because a minimal Kakeya set there very nearly is a zero set of degree $q$; in the joints problem the constant is off by a factor of $36$, because the pruning and the dimension count each lose a constant that the true extremal configuration does not.

The third is methodological. The theorems of this dissertation are presented in the literature as separate achievements with separate proofs, and they were discovered separately. Seen from the three lemmas they are one argument with four bridges, and the bridges are where the mathematics specific to each problem lives. This suggests that new applications of the method should be sought by looking for new bridges: configurations on which a low-degree polynomial is forced, by the configuration's structure, to vanish on a larger set, or to have a diagonal matrix, or to have derivatives that vanish on the same set. The multiplicity layer of Chapter 2 is available for any bridge that produces vanishing along lines, and the slice-rank layer for any bridge that produces a diagonal tensor. Which further configurations admit such bridges is, in the author's view, the most promising direction for the method, and it is one that the three-lemma organisation is designed to make visible.
# Appendix A. Computations

All computations were performed with a short program in JavaScript (Node.js 22) on a laptop, and are reproducible in any language; the program is listed in §A.6. Running times are given where they matter. The purpose of the computations is not to confirm the theorems, which are proved, but to measure the distance between each polynomial bound and the truth in the smallest cases.

## A.1 Sumsets in $\mathbb Z_p$

For each prime $p\le17$ and each $k$, the minimum of $|A+A|$ and of $|A\mathbin{\hat+}A|$ over all $k$-subsets $A\subseteq\mathbb Z_p$ was computed by enumerating all $2^p$ subsets. For $p\le11$ the minimum of $|A\mathbin{\hat+}B|$ over all pairs of subsets with $|A|\ne|B|$ was computed by enumerating all pairs. In every case the minimum equals the polynomial bound:

**Table A.1.** *Minimum of $\big(|A+A|,\ |A\mathbin{\hat+}A|\big)$ over $k$-subsets of $\mathbb Z_p$.*

| $p$ | $k=2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ |
|---|---|---|---|---|---|---|---|---|---|
| 5 | (3,1) | (5,3) | (5,5) | (5,5) | | | | | |
| 7 | (3,1) | (5,3) | (7,5) | (7,7) | (7,7) | (7,7) | | | |
| 11 | (3,1) | (5,3) | (7,5) | (9,7) | (11,9) | (11,11) | (11,11) | (11,11) | (11,11) |
| 13 | (3,1) | (5,3) | (7,5) | (9,7) | (11,9) | (13,11) | (13,13) | (13,13) | (13,13) |
| 17 | (3,1) | (5,3) | (7,5) | (9,7) | (11,9) | (13,11) | (15,13) | (17,15) | (17,17) |

These agree with $\min(p,2k-1)$ and $\min(p,2k-3)$ for every entry (and for the omitted $k>10$ at $p=17$). For $|A|\ne|B|$, all $42$ size pairs at $p=7$ and all $110$ at $p=11$ have minimum $\min(p,k+l-2)$. Theorem B is therefore sharp for every $k$, not only asymptotically.

## A.2 Erdős–Ginzburg–Ziv

For each $n\le9$, every multiset of $2n-1$ residues modulo $n$ (there are $\binom{3n-2}{n-1}$ of them) was tested, by dynamic programming over (number of elements used, sum modulo $n$), for an $n$-element sub-multiset with sum $0$. All multisets pass:

| $n$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|
| multisets | 4 | 21 | 120 | 715 | 4368 | 27132 | 170544 | 1081575 |
| passing | 4 | 21 | 120 | 715 | 4368 | 27132 | 170544 | 1081575 |

## A.3 Cap sets

The maximum size of a cap set in $\mathbb F_3^n$ was computed by depth-first search over points in a fixed order, maintaining for each point the number of pairs already chosen whose third collinear point it is, and pruning when the current size plus the number of unforbidden remaining points cannot exceed the best found. No symmetry reduction was used.

**Table A.3.**

| $n$ | result | status | time |
|---|---|---|---|
| 1 | 2 | exhaustive | $<1$ ms |
| 2 | 4 | exhaustive | $<1$ ms |
| 3 | 9 | exhaustive | 48 ms |
| 4 | 20 | search stopped at 240 s; a cap of size 20 was found | 240 s |

For $n=4$ the search found the known maximum $20$ but did not complete; completing it requires symmetry reduction (the affine group of $\mathbb F_3^4$ has order $81\cdot|GL_4(\mathbb F_3)|$), which was not implemented. The value $r(4)=20$ is established in the literature (Bierbrauer and Edel 2002).

## A.4 Ellenberg–Gijswijt numbers

The numbers $m_d=\#\{\boldsymbol\alpha\in\{0,1,2\}^n:|\boldsymbol\alpha|\le d\}$ were computed by dynamic programming. The constant of Theorem 6.9 was evaluated as $t_0=(\sqrt{33}-1)/8=0.593070331$, $c=2.755105$.

**Table A.4.** *Cap-set bounds in $\mathbb F_3^n$.*

| $n$ | $2^n$ | $m_{\lfloor2n/3\rfloor}$ | $3m_{\lfloor2n/3\rfloor}$ (Cor. 6.6) | best $d$ in Thm 6.5 | $3c^n$ | $3^n$ | $r(n)$ |
|---|---|---|---|---|---|---|---|
| 1 | 2 | 1 | 3 | 3 | 8.3 | 3 | 2 |
| 2 | 4 | 3 | 9 | 7 | 22.8 | 9 | 4 |
| 3 | 8 | 10 | 30 | 18 | 62.7 | 27 | 9 |
| 4 | 16 | 15 | 45 | 45 | 172.9 | 81 | 20 |
| 5 | 32 | 51 | 153 | 123 | 476.2 | 243 | 45 |
| 6 | 64 | 168 | 504 | 324 | 1312.0 | 729 | 112 |
| 7 | 128 | 274 | 822 | 822 | 3614.8 | 2187 | |
| 8 | 256 | 927 | 2781 | 2277 | 9959.2 | 6561 | |
| 9 | 512 | 3061 | 9183 | 6075 | 27438.7 | 19683 | |
| 10 | 1024 | 5193 | 15579 | 15579 | 75596.6 | 59049 | |
| 11 | 2048 | 17469 | 52407 | 43365 | 208276.5 | 177147 | |
| 12 | 4096 | 57720 | 173160 | 116532 | 573823.6 | 531441 | |

The column "best $d$" is $\min_d\big(m_{2n-d-1}+m_{\lfloor d/2\rfloor}+m_{\lceil d/2\rceil-1}\big)$; the minimising $d$ is $0,2,3,5,6,7,9,10,11,13,14,15$ for $n=1,\dots,12$. Note that $3c^n$ exceeds $3^n$ for $n\le12$: the exponential bound only overtakes the trivial one at $n\ge13$, though $3m_{\lfloor2n/3\rfloor}$ is below $3^n$ from $n=4$.

## A.5 Kakeya sets in the plane

For $q\in\{3,5,7\}$ the minimum size of a union of $q+1$ lines, one in each direction of $\mathbb F_q^2$, was computed by branch and bound over the $q^{q+1}$ choices. Since every Kakeya set contains such a union, this is the minimum size of a Kakeya set. Results, with the bounds of Chapter 4 and the exact formula of Blokhuis and Mazzocca (2008):

| $q$ | minimum | $(q^2+2q-1)/2$ | Dvir | DKSS |
|---|---|---|---|---|
| 3 | 7 | 7 | 6 | 3.24 |
| 5 | 17 | 17 | 15 | 7.72 |
| 7 | 31 | 31 | 28 | 14.21 |

The minimal set for $q=5$ found by the search is drawn in Figure 1. For reference, the two lower bounds in higher dimension: for $(q,n)=(5,3)$ Dvir gives $35$ and DKSS $21.4$; for $(5,5)$, $126$ and $165.4$; for $(11,5)$, $3003$ and $6350.8$; for $(101,5)$, $9.66\times10^7$ and $3.37\times10^8$ against $q^n\approx1.05\times10^{10}$.

## A.6 Punctured Kakeya sets (Chapter 7)

For each $q\in\{3,4,5,7,8,9\}$, every choice of one line per direction in $\mathbb F_q^2$ was enumerated, the lines in the directions $(1,0)$ and $(0,1)$ being fixed by translation, so that $q^{q-1}$ configurations remain ($43{,}046{,}721$ for $q=9$, about one minute). Fields of order $4$, $8$, $9$ were represented as $\mathbb F_2[x]/(x^2+x+1)$, $\mathbb F_2[x]/(x^3+x+1)$, $\mathbb F_3[x]/(x^2+1)$. For each configuration the program records the multiplicity $m_P$ of every point, the excess $E$, the number $s$ of lines carrying a simple point, and the matching number $\nu$, computed exactly by dynamic programming over the $2^{q+1}$ subsets of lines: $\nu(M)=\max\big(\nu(M\setminus\{v\}),\ 1+\max_{e\ni v,\ e\subseteq M}\nu(M\setminus e)\big)$ where $v$ is the lowest line in $M$ and $e$ ranges over the points whose line set contains $v$. The three tables of §7.6 are the output. The core of the program:

```
// one line per direction; lines[d][b] = point indices of the b-th line in direction d
function matchingNumber(edgeMasks) {          // edges = points, as bitmasks of the lines through them
  const full = (1 << D) - 1, byLow = Array.from({ length: D }, () => []);
  for (const e of edgeMasks) { let v = 0; while (!((e >> v) & 1)) v++; byLow[v].push(e); }
  const dp = new Int8Array(1 << D);
  for (let mask = 1; mask <= full; mask++) {
    let v = 0; while (!((mask >> v) & 1)) v++;
    let best = dp[mask & ~(1 << v)];
    for (const e of byLow[v]) if ((e & mask) === e) best = Math.max(best, 1 + dp[mask & ~e]);
    dp[mask] = best;
  }
  return dp[full];
}
function evaluate() {                          // called once per configuration
  let E = 0, edges = [], lineHasSimple = Array(D).fill(false);
  for (let P = 0; P < N; P++) {
    const m = cnt[P]; if (m === 0) continue;
    if (m >= 3) E += ((m - 1) * (m - 2)) / 2;
    if (m === 1) lineHasSimple[lowestBit(pmask[P])] = true;
    edges.push(pmask[P]);
  }
  const s = lineHasSimple.filter(Boolean).length, nu = matchingNumber(edges);
  record(size, E, s, nu);                       // |U| = size; |K'| = size - nu
}
function rec(d) {                              // depth-first over directions, maintaining cnt[] and pmask[]
  if (d === D) { evaluate(); return; }
  for (const b of (d === 0 || d === D - 1) ? [0] : [...Array(q).keys()]) {
    for (const P of lines[d][b]) { if (cnt[P]++ === 0) size++; pmask[P] |= 1 << d; }
    rec(d + 1);
    for (const P of lines[d][b]) { if (--cnt[P] === 0) size--; pmask[P] &= ~(1 << d); }
  }
}
```

## A.7 Program for Appendices A.1 to A.5

```
// compute.js — computational checks (Node.js). Prints the tables of Appendix A.
const fs = require("fs");

// A.1 Sumsets in Z_p
function sumsetStats(p) {
  const N = 1 << p, minPlain = Array(p + 1).fill(Infinity), minRestr = Array(p + 1).fill(Infinity);
  const pc = (x) => { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; };
  for (let m = 1; m < N; m++) {
    const A = []; for (let i = 0; i < p; i++) if (m >> i & 1) A.push(i);
    let plain = 0, restr = 0;
    for (const a of A) for (const b of A) { plain |= 1 << ((a + b) % p); if (a !== b) restr |= 1 << ((a + b) % p); }
    minPlain[A.length] = Math.min(minPlain[A.length], pc(plain));
    minRestr[A.length] = Math.min(minRestr[A.length], pc(restr));
  }
  return { minPlain, minRestr };
}

// A.2 Erdős–Ginzburg–Ziv: all multisets of 2n-1 residues mod n
function egz(n) {
  let total = 0, good = 0; const c = Array(n).fill(0);
  function check() {
    total++;
    let dp = Array.from({ length: n + 1 }, () => Array(n).fill(false)); dp[0][0] = true;
    for (let r = 0; r < n; r++) for (let t = 0; t < c[r]; t++)
      for (let j = n - 1; j >= 0; j--) for (let s = 0; s < n; s++) if (dp[j][s]) dp[j + 1][(s + r) % n] = true;
    if (dp[n][0]) good++;
  }
  (function rec(i, left) {
    if (i === n - 1) { c[i] = left; check(); return; }
    for (let v = 0; v <= left; v++) { c[i] = v; rec(i + 1, left - v); }
  })(0, 2 * n - 1);
  return { total, good };
}

// A.3 Cap sets in F_3^n: branch and bound
function capMax(n, timeLimitMs) {
  const N = 3 ** n, pts = [];
  for (let i = 0; i < N; i++) { const v = []; let x = i; for (let j = 0; j < n; j++) { v.push(x % 3); x = Math.floor(x / 3); } pts.push(v); }
  const idx = (v) => v.reduce((a, d, j) => a + d * 3 ** j, 0);
  const third = (i, j) => idx(pts[i].map((d, t) => (6 - d - pts[j][t]) % 3));
  let bestSize = 0, timedOut = false; const t0 = Date.now(), forb = new Int32Array(N), cur = [];
  function dfs(start) {
    if (Date.now() - t0 > timeLimitMs) { timedOut = true; return; }
    let cand = 0; for (let i = start; i < N; i++) if (forb[i] === 0) cand++;
    if (cur.length + cand <= bestSize) return;
    for (let i = start; i < N; i++) {
      if (forb[i] !== 0) continue;
      const added = []; for (const c of cur) { const t = third(i, c); forb[t]++; added.push(t); }
      cur.push(i); if (cur.length > bestSize) bestSize = cur.length;
      dfs(i + 1); cur.pop(); for (const t of added) forb[t]--;
      if (timedOut) return;
    }
  }
  dfs(0); return { bestSize, timedOut, ms: Date.now() - t0 };
}

// A.4 m_d and the constant c
function m3(n, d) {
  if (d < 0) return 0;
  let dp = Array(2 * n + 1).fill(0); dp[0] = 1;
  for (let i = 0; i < n; i++) { const nd = Array(2 * n + 1).fill(0);
    for (let s = 0; s <= 2 * n; s++) if (dp[s]) for (let a = 0; a <= 2; a++) if (s + a <= 2 * n) nd[s + a] += dp[s]; dp = nd; }
  let tot = 0; for (let s = 0; s <= Math.min(d, 2 * n); s++) tot += dp[s]; return tot;
}
const t0 = (Math.sqrt(33) - 1) / 8, c0 = (1 + t0 + t0 * t0) * Math.pow(t0, -2 / 3);

// A.5 Kakeya sets in F_q^2: one line per direction
function kakeya2(q) {
  const lines = [];
  for (let s = 0; s < q; s++) lines.push([...Array(q)].map((_, b) => [...Array(q)].map((_, t) => t * q + ((b + s * t) % q))));
  lines.push([...Array(q)].map((_, b) => [...Array(q)].map((_, t) => b * q + t)));
  let best = Infinity; const cnt = new Int32Array(q * q); let size = 0;
  (function rec(d) {
    if (d === lines.length) { best = Math.min(best, size); return; }
    if (size >= best) return;
    for (const pts of lines[d]) { for (const p of pts) if (cnt[p]++ === 0) size++; rec(d + 1); for (const p of pts) if (--cnt[p] === 0) size--; }
  })(0);
  return best;
}

for (const p of [5, 7, 11, 13, 17]) console.log(p, sumsetStats(p));
for (let n = 2; n <= 9; n++) console.log(n, egz(n));
for (let n = 1; n <= 4; n++) console.log(n, capMax(n, n === 4 ? 240000 : 60000));
for (let n = 1; n <= 12; n++) console.log(n, m3(n, Math.floor(2 * n / 3)), 3 * c0 ** n);
for (const q of [3, 5, 7]) console.log(q, kakeya2(q), (q * q + 2 * q - 1) / 2);
```
# Bibliography

Alon, N. (1999). "Combinatorial Nullstellensatz." *Combinatorics, Probability and Computing* 8(1–2): 7–29.

Alon, N., Nathanson, M. B., and Ruzsa, I. Z. (1995). "Adding Distinct Congruence Classes Modulo a Prime." *American Mathematical Monthly* 102(3): 250–255.

Alon, N., Nathanson, M. B., and Ruzsa, I. Z. (1996). "The Polynomial Method and Restricted Sums of Congruence Classes." *Journal of Number Theory* 56(2): 404–417.

Alon, N., and Tarsi, M. (1992). "Colorings and Orientations of Graphs." *Combinatorica* 12(2): 125–134.

Arsovski, B. (2011). "A Proof of Snevily's Conjecture." *Israel Journal of Mathematics* 182: 505–508.

Ax, J. (1964). "Zeroes of Polynomials over Finite Fields." *American Journal of Mathematics* 86(2): 255–261.

Ball, S., Blokhuis, A., and Domenzain, D. (2016). "A Finite Version of the Kakeya Problem." arXiv:1503.06639.

Bateman, M., and Katz, N. H. (2012). "New Bounds on Cap Sets." *Journal of the American Mathematical Society* 25(2): 585–613.

Besicovitch, A. S. (1928). "On Kakeya's Problem and a Similar One." *Mathematische Zeitschrift* 27: 312–320.

Bichara, A., and Korchmáros, G. (1982). "Note on $(q+2)$-Sets in a Galois Plane of Order $q$." *Annals of Discrete Mathematics* 14: 117–122.

Bierbrauer, J., and Edel, Y. (2002). "Bounds on Affine Caps." *Journal of Combinatorial Designs* 10(2): 111–115.

Blasiak, J., Church, T., Cohn, H., Grochow, J. A., Naslund, E., Sawin, W. F., and Umans, C. (2017). "On Cap Sets and the Group-Theoretic Approach to Matrix Multiplication." *Discrete Analysis* 2017:3.

Blokhuis, A., De Boeck, M., Mazzocca, F., and Storme, L. (2014). "The Kakeya Problem: A Gap in the Spectrum and Classification of the Smallest Examples." *Designs, Codes and Cryptography* 72(1): 21–31.

Blokhuis, A., and Mazzocca, F. (2008). "The Finite Field Kakeya Problem." In M. Grötschel and G. O. H. Katona (eds.), *Building Bridges: Between Mathematics and Computer Science*. Bolyai Society Mathematical Studies 19. Berlin: Springer, 205–218.

Bourgain, J., Katz, N., and Tao, T. (2004). "A Sum–Product Estimate in Finite Fields, and Applications." *Geometric and Functional Analysis* 14(1): 27–57.

Carbery, A., and Iliopoulou, M. (2014). "Counting Joints with Multiplicities." *Proceedings of the London Mathematical Society* 109(6): 1420–1450.

Cauchy, A.-L. (1813). "Recherches sur les nombres." *Journal de l'École Polytechnique* 9: 99–116.

Chazelle, B., Edelsbrunner, H., Guibas, L. J., Pollack, R., Seidel, R., Sharir, M., and Snoeyink, J. (1992). "Counting and Cutting Cycles of Lines and Rods in Space." *Computational Geometry* 1(6): 305–323.

Chevalley, C. (1935). "Démonstration d'une hypothèse de M. Artin." *Abhandlungen aus dem Mathematischen Seminar der Universität Hamburg* 11: 73–75.

Croot, E., Lev, V. F., and Pach, P. P. (2017). "Progression-Free Sets in $\mathbb Z_4^n$ Are Exponentially Small." *Annals of Mathematics* 185(1): 331–337.

Davenport, H. (1935). "On the Addition of Residue Classes." *Journal of the London Mathematical Society* 10: 30–32.

Davenport, H. (1947). "A Historical Note." *Journal of the London Mathematical Society* 22: 100–101.

DeMillo, R. A., and Lipton, R. J. (1978). "A Probabilistic Remark on Algebraic Program Testing." *Information Processing Letters* 7(4): 193–195.

Dhar, M., Dvir, Z., and Lund, B. (2021). "Simple Proofs for Furstenberg Sets over Finite Fields." *Discrete Analysis* 2021. arXiv:1909.03180.

Dias da Silva, J. A., and Hamidoune, Y. O. (1994). "Cyclic Spaces for Grassmann Derivatives and Additive Theory." *Bulletin of the London Mathematical Society* 26(2): 140–146.

Dover, J. M., and Mellinger, K. E. (2014). "Minimal Kakeya Sets." *Journal of Combinatorial Designs*, doi:10.1002/jcd.21344.

Dvir, Z. (2009). "On the Size of Kakeya Sets in Finite Fields." *Journal of the American Mathematical Society* 22(4): 1093–1097.

Dvir, Z. (2012). "Incidence Theorems and Their Applications." *Foundations and Trends in Theoretical Computer Science* 6(4): 257–393.

Dvir, Z., Kopparty, S., Saraf, S., and Sudan, M. (2013). "Extensions to the Method of Multiplicities, with Applications to Kakeya Sets and Mergers." *SIAM Journal on Computing* 42(6): 2305–2328.

Edel, Y. (2004). "Extensions of Generalized Product Caps." *Designs, Codes and Cryptography* 31(1): 5–14.

Edel, Y., Ferret, S., Landjev, I., and Storme, L. (2002). "The Classification of the Largest Caps in AG(5,3)." *Journal of Combinatorial Theory, Series A* 99(1): 95–110.

Ellenberg, J. S., and Erman, D. (2016). "Furstenberg Sets and Furstenberg Schemes over Finite Fields." *Discrete Analysis* 2016. arXiv:1502.03736.

Ellenberg, J. S., and Gijswijt, D. (2017). "On Large Subsets of $\mathbb F_q^n$ with No Three-Term Arithmetic Progression." *Annals of Mathematics* 185(1): 339–343.

Erdős, P., Ginzburg, A., and Ziv, A. (1961). "Theorem in the Additive Number Theory." *Bulletin of the Research Council of Israel* 10F: 41–43.

Erdős, P., and Heilbronn, H. (1964). "On the Addition of Residue Classes mod $p$." *Acta Arithmetica* 9: 149–159.

Feldman, S., and Sharir, M. (2005). "An Improved Bound for Joints in Arrangements of Lines in Space." *Discrete & Computational Geometry* 33(2): 307–320.

Guth, L. (2016). *Polynomial Methods in Combinatorics*. University Lecture Series 64. Providence, RI: American Mathematical Society.

Guth, L., and Katz, N. H. (2010). "Algebraic Methods in Discrete Analogs of the Kakeya Problem." *Advances in Mathematics* 225(5): 2828–2839.

Guth, L., and Katz, N. H. (2015). "On the Erdős Distinct Distances Problem in the Plane." *Annals of Mathematics* 181(1): 155–190.

Hasse, H. (1936). "Theorie der höheren Differentiale in einem algebraischen Funktionenkörper mit vollkommenem Konstantenkörper bei beliebiger Charakteristik." *Journal für die reine und angewandte Mathematik* 175: 50–54.

Hirschfeld, J. W. P. (1998). *Projective Geometries over Finite Fields*, 2nd edn. Oxford: Clarendon Press.

Kakeya, S. (1917). "Some Problems on Maximum and Minimum Regarding Ovals." *Tôhoku Science Reports* 6: 71–88.

Kaplan, H., Sharir, M., and Shustin, E. (2010). "On Lines and Joints." *Discrete & Computational Geometry* 44(4): 838–843.

Károlyi, G. (2004). "The Erdős–Heilbronn Problem in Abelian Groups." *Israel Journal of Mathematics* 139: 349–359.

Kemnitz, A. (1983). "On a Lattice Point Problem." *Ars Combinatoria* 16b: 151–160.

Lasoń, M. (2010). "A Generalization of Combinatorial Nullstellensatz." *Electronic Journal of Combinatorics* 17: N32.

Lidl, R., and Niederreiter, H. (1997). *Finite Fields*, 2nd edn. Encyclopedia of Mathematics and Its Applications 20. Cambridge: Cambridge University Press.

Meshulam, R. (1995). "On Subsets of Finite Abelian Groups with No 3-Term Arithmetic Progressions." *Journal of Combinatorial Theory, Series A* 71(1): 168–172.

Michałek, M. (2010). "A Short Proof of Combinatorial Nullstellensatz." *American Mathematical Monthly* 117(9): 821–823.

Mockenhaupt, G., and Tao, T. (2004). "Restriction and Kakeya Phenomena for Finite Fields." *Duke Mathematical Journal* 121(1): 35–74.

Nathanson, M. B. (1996). *Additive Number Theory: Inverse Problems and the Geometry of Sumsets*. Graduate Texts in Mathematics 165. New York: Springer.

Potechin, A. (2008). "Maximal Caps in AG(6,3)." *Designs, Codes and Cryptography* 46(3): 243–259.

Quilodrán, R. (2010). "The Joints Problem in $\mathbb R^n$." *SIAM Journal on Discrete Mathematics* 23(4): 2211–2213.

Reiher, C. (2007). "On Kemnitz' Conjecture Concerning Lattice-Points in the Plane." *Ramanujan Journal* 13(1–3): 333–337.

Romera-Paredes, B., Barekatain, M., Novikov, A., Balog, M., Kumar, M. P., Dupont, E., Ruiz, F. J. R., Ellenberg, J. S., Wang, P., Fawzi, O., Kohli, P., and Fawzi, A. (2024). "Mathematical Discoveries from Program Search with Large Language Models." *Nature* 625: 468–475.

Saraf, S., and Sudan, M. (2008). "An Improved Lower Bound on the Size of Kakeya Sets over Finite Fields." *Analysis & PDE* 1(3): 375–379.

Schwartz, J. T. (1980). "Fast Probabilistic Algorithms for Verification of Polynomial Identities." *Journal of the ACM* 27(4): 701–717.

Sharir, M. (1994). "On Joints in Arrangements of Lines in Space and Related Problems." *Journal of Combinatorial Theory, Series A* 67(1): 89–99.

Szemerédi, E., and Trotter, W. T. (1983). "Extremal Problems in Discrete Geometry." *Combinatorica* 3(3–4): 381–392.

Tao, T. (2014). "Algebraic Combinatorial Geometry: The Polynomial Method in Arithmetic Combinatorics, Incidence Combinatorics, and Number Theory." *EMS Surveys in Mathematical Sciences* 1(1): 1–46.

Tao, T. (2016). "A Symmetric Formulation of the Croot–Lev–Pach–Ellenberg–Gijswijt Capset Bound." Blog post, *What's New*, 18 May 2016. terrytao.wordpress.com.

Tao, T., and Vu, V. H. (2006). *Additive Combinatorics*. Cambridge Studies in Advanced Mathematics 105. Cambridge: Cambridge University Press.

Tyrrell, F. (2023). "New Lower Bounds for Cap Sets." *Discrete Analysis* 2023:20.

Vosper, A. G. (1956). "The Critical Pairs of Subsets of a Group of Prime Order." *Journal of the London Mathematical Society* 31: 200–205.

Wang, H., and Zahl, J. (2025). "Volume Estimates for Unions of Convex Sets, and the Kakeya Set Conjecture in Three Dimensions." arXiv:2502.17655.

Warning, E. (1935). "Bemerkung zur vorstehenden Arbeit von Herrn Chevalley." *Abhandlungen aus dem Mathematischen Seminar der Universität Hamburg* 11: 76–83.

Wolff, T. (1999). "Recent Work Connected with the Kakeya Problem." In H. Rossi (ed.), *Prospects in Mathematics (Princeton, NJ, 1996)*. Providence, RI: American Mathematical Society, 129–162.

Yu, H.-H. H., and Zhao, Y. (2022). "Joints of Varieties." *Geometric and Functional Analysis* 32: 302–339.

Zippel, R. (1979). "Probabilistic Algorithms for Sparse Polynomials." In E. W. Ng (ed.), *Symbolic and Algebraic Computation (EUROSAM '79)*. Lecture Notes in Computer Science 72. Berlin: Springer, 216–226.
