# Kakeya Sets with Multiplicity

## Lines in Every Direction, r Times: Maximal Arcs, a Counting Bound, and the Limits of the Polynomial Method

*A dissertation in mathematics*

---

### Abstract

A Kakeya set in the affine plane $AG(2,q)$ over the field with $q$ elements is a set containing a line in every direction. Its minimum size was determined by Blokhuis and Mazzocca in 2008, after Dvir's polynomial-method bound of 2008 had settled the order of magnitude in every dimension. This dissertation studies the natural generalisation in which $r$ distinct lines are required in every direction: an *$r$-fold Kakeya set*. Let $\kappa_r(q)$ be the least size of such a set.

The polynomial method, applied to $r$-fold sets, returns exactly what it returns for $r=1$: no polynomial of degree less than $q$ vanishes on the set, hence $\kappa_r(q)\ge\binom{q+1}{2}$, and in every case computed here that is all the restriction-to-lines argument can give. An elementary count does better. Writing $m_P$ for the number of chosen lines through a point $P$, the union $U$ of the lines satisfies the exact identity
$$|U|=\frac{r}{r+1}\,q(q+1)+\frac{1}{(r+1)^2}\sum_{P\in U}(m_P-r-1)^2,$$
so that $\kappa_r(q)\ge\frac{r}{r+1}q(q+1)$, with equality if and only if every point of the union lies on exactly $r+1$ of the lines. Under the standard point–line duality of the projective plane this equality case is precisely a *maximal arc* of degree $r+1$, and two classical theorems then decide the matter: Denniston's construction (1969) shows that the bound is attained for every even $q$ and every $r+1$ dividing $q$, and the theorem of Ball, Blokhuis, and Mazzocca (1997), itself a polynomial-method result, shows that for odd $q$ it is never attained when $2\le r+1\le q-1$. Thus the polynomial method, shut out at the front door, returns through the back.

Near the other end of the range the problem is solved exactly. It is shown that $\kappa_{q-s}(q)=q^2-s$ whenever $s\le D(q)-2$, where $D(q)$ is the least number of points of $AG(2,q)$ that determine all $q+1$ directions; $D(q)$ is at least the least $t$ with $\binom t2\ge q+1$, and is computed exactly for $q\le16$. Exhaustive computation gives $\kappa_r(q)$ for all $r$ when $q\le7$ and for most $r$ when $q\in\{8,9\}$; explicit constructions from Denniston arcs, from pencils of conics, and from pencils of lines account for the values found. The deficiency $\kappa_r(q)-\frac{r}{r+1}q(q+1)$ for odd $q$ is tabulated and its growth is posed as the main open problem.

---

### Contents

1. Introduction
2. Preliminaries: Planes, Duality, Arcs, and Kakeya Sets
3. The Counting Bound
4. Equality and Maximal Arcs
5. Near the Top: Many Lines per Direction
6. Odd Order
7. Constructions and Exact Values
8. Conclusion
Appendix A. Computations
Bibliography

---

### Notation

$q=p^h$ is a prime power and $\mathbb F_q$ the field with $q$ elements. $AG(2,q)$ is the affine plane, with points $(x,y)\in\mathbb F_q^2$ and $q^2+q$ lines; $PG(2,q)$ the projective plane, with homogeneous coordinates $(x:y:z)$ and lines $[u:v:w]=\{(x:y:z):ux+vy+wz=0\}$. $AG(2,q)$ is identified with $PG(2,q)$ minus the line at infinity $\ell_\infty=[0:0:1]$; the $q+1$ points of $\ell_\infty$ are the *directions*, and two affine lines are parallel iff they meet $\ell_\infty$ in the same point. An *$r$-fold configuration* $\mathcal L$ is a set of $r(q+1)$ affine lines containing exactly $r$ lines of each direction; $U(\mathcal L)=\bigcup\mathcal L$ is its *union*, and for a point $P$, $m_P=m_P(\mathcal L)$ is the number of lines of $\mathcal L$ through $P$, its *multiplicity*. An *$r$-fold Kakeya set* is a set containing at least $r$ lines of every direction, and $\kappa_r(q)$ is the least size of one; clearly $\kappa_r(q)=\min_{\mathcal L}|U(\mathcal L)|$ over $r$-fold configurations. $\square$ denotes the set of nonzero squares of $\mathbb F_q$. Theorems, lemmas, equations, and tables are numbered by chapter.
# Chapter 1. Introduction

## 1.1 The problem

Wolff (1999) proposed the finite-field Kakeya problem as a model for the Euclidean one: how small can a subset of $\mathbb F_q^n$ be if it contains a line in every direction? Dvir (2009) answered it up to a constant with a two-page polynomial argument, and in the plane Blokhuis and Mazzocca (2008) found the exact answer: a Kakeya set in $AG(2,q)$ has at least $\frac{q(q+1)}2+\frac{q-1}2$ points when $q$ is odd and at least $\frac{q(q+1)}2$ when $q$ is even, both bounds being attained.

This dissertation asks what happens when the set is required to contain not one but $r$ distinct lines in every direction. Call such a set an *$r$-fold Kakeya set* and write $\kappa_r(q)$ for its least possible size. For $r=1$ this is the Kakeya problem; for $r=q$ the only $q$-fold set is the whole plane. In between, the question turns out to have a structure that neither the Kakeya problem nor its polynomial-method treatment prepares one for.

Two remarks motivate the question. First, the requirement "at least $r$ lines in every direction" is the natural way to make a Kakeya set robust: a $1$-fold set can be destroyed by deleting one point from each of $q+1$ lines, while an $r$-fold set survives the deletion of $r-1$ lines' worth. Second, and more consequentially, the dual of an $r$-fold configuration is a classical object. Under the point–line duality of $PG(2,q)$ the $r(q+1)$ lines become $r(q+1)$ points, exactly $r$ on each line through a fixed point $O$, and the size of the union becomes the number of lines not through $O$ that meet this point set. When every point of the union lies on exactly $r+1$ of the lines, the dual point set together with $O$ is a set meeting every line in $0$ or $r+1$ points: a *maximal arc*. Maximal arcs are among the most studied objects of finite geometry, and their existence question was settled by Denniston (1969), who constructed them for every even $q$ and every degree dividing $q$, and by Ball, Blokhuis, and Mazzocca (1997), who proved that for odd $q$ they do not exist in any nontrivial degree. The second of these theorems is itself a polynomial-method result. So the polynomial method, which as I show cannot see past $r=1$ when applied directly, governs the answer for every $r$ once the problem is turned around.

## 1.2 Main results

Throughout, $\mathcal L$ is an $r$-fold configuration in $AG(2,q)$, $U=U(\mathcal L)$ its union, and $m_P$ the number of lines of $\mathcal L$ through $P$.

**Theorem A (Variance identity).** *For every $r$-fold configuration,*
$$|U|=\frac{r}{r+1}\,q(q+1)+\frac{1}{(r+1)^2}\sum_{P\in U}\big(m_P-(r+1)\big)^2.$$
*Consequently $\kappa_r(q)\ge\frac{r}{r+1}q(q+1)$, with equality for a configuration if and only if every point of its union has multiplicity exactly $r+1$.*

**Theorem B (Equality and maximal arcs).** *A configuration attains the bound of Theorem A if and only if its dual point set, together with the distinguished point $O$, is a maximal arc of degree $r+1$ in $PG(2,q)$. Consequently $\kappa_r(q)=\frac{r}{r+1}q(q+1)$ holds exactly in the following cases: $r\in\{q-1,q\}$; or $q$ even and $(r+1)\mid q$. In every other case, in particular for every odd $q$ and every $1\le r\le q-2$, the inequality is strict.*

**Theorem C (Many lines per direction).** *Let $D(q)$ be the least size of a set of points of $AG(2,q)$ that determines all $q+1$ directions. Then for $1\le s\le D(q)-2$,*
$$\kappa_{q-s}(q)=q^2-s,$$
*and this fails for $s=D(q)-1$. Moreover $D(q)\ge t_0(q):=\min\{t:\binom t2\ge q+1\}$, so the formula holds in particular whenever $s(s+1)<2(q+1)$. The values of $D(q)$ for $q\le16$ are*

| $q$ | 3 | 4 | 5 | 7 | 8 | 9 | 11 | 13 | 16 |
|---|---|---|---|---|---|---|---|---|---|
| $t_0(q)$ | 4 | 4 | 4 | 5 | 5 | 5 | 6 | 6 | 7 |
| $D(q)$ | 4 | 4 | 4 | 5 | 5 | 6 | 6 | 6 | 7 |

**Theorem D (The polynomial method).** *No nonzero polynomial of degree less than $q$ vanishes on an $r$-fold Kakeya set, for any $r\ge1$; hence $\kappa_r(q)\ge\binom{q+1}2$. The argument sees one line per direction, and in the cases computed in Chapter 7 ($q=5$, $r=2$; $q=7$, $1\le r\le4$) it has nothing more to give: reduced polynomials of degree $q$ vanishing on a $1$-fold union exist, and the least degree of a nonzero reduced polynomial vanishing on a minimal $r$-fold union equals the trivial counting threshold, so any improvement on $\binom{q+1}2$ needs an ingredient the argument does not contain.*

**Theorem E (Constructions).** *(i) For $1\le s\le q$, the lines avoiding $s$ collinear points form a $(q-s)$-fold Kakeya set of size $q^2-s$. (ii) For $q$ even and $n\mid q$, the dual of a Denniston arc of degree $n$ is an $(n-1)$-fold configuration attaining Theorem A, and for every divisor $n'$ of $n$ it contains an $(n'-1)$-fold sub-configuration attaining Theorem A. (iii) For $q$ odd and $r$ even, the union of $r/2$ conics of square parameter and $r/2$ conics of non-square parameter in the pencil $x^2-\beta y^2=\lambda$ ($\beta$ a non-square) dualises to an $r$-fold configuration.*

Together with exhaustive search, these give the following table of exact values; a range gives the best bounds known.

| $q$ | $r=1$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| 3 | 7 | 8 | | | | | | |
| 4 | 10 | 14 | 15 | | | | | |
| 5 | 17 | 21 | 23 | 24 | | | | |
| 7 | 31 | 40 | 44 | 46 | 47 | 48 | | |
| 8 | 36 | 51 | 54 | 58 or 59 | 61 | 62 | 63 | |
| 9 | 49 | 61 to 65 | $\ge68$ | $\ge73$ | 77 | 78 | 79 | 80 |

The lower bound of Theorem A is attained exactly at the entries $(3,2)$, $(4,1)$, $(4,3)$, $(5,4)$, $(7,6)$, $(8,1)$, $(8,3)$, $(8,7)$, $(9,8)$, and at no others, as Theorem B predicts.

## 1.3 Provenance

I have tried to be exact about what is new. The definition of $r$-fold Kakeya sets, the variance identity of Theorem A, the equality characterisation and its consequences in Theorem B, the reduction of the problem near $r=q$ to the direction-determination number $D(q)$ in Theorem C, the observation in Theorem D that the polynomial method is stuck at $r=1$, the constructions (ii) and (iii) of Theorem E as $r$-fold Kakeya sets, and all the computations are, to the best of my knowledge, new. A literature search found no treatment of Kakeya sets with a multiplicity requirement and no mention of the duality with maximal arcs in that context. On the other side of the duality everything is classical: maximal arcs go back to Barlotti (1955) and Cossu (1961), Denniston's construction is from 1969, the divisibility condition is folklore, and the non-existence theorem for odd $q$ is due to Ball, Blokhuis, and Mazzocca (1997), with a shorter proof by Ball and Blokhuis (1998). A specialist in finite geometry will recognise Theorem B as a translation; I claim only that the translation is worth making, because it exhibits an extremal problem of Kakeya type whose answer, in the equality case, is decided by a theorem proved with polynomials after the direct polynomial approach has failed. The quantity $D(q)$ of Theorem C, the smallest set determining all directions, is a natural cousin of the well-studied problem of the *fewest* directions determined by a set of $q$ points (Rédei 1970; Szőnyi 1996; Ball, Blokhuis, Brouwer, Storme, and Szőnyi 1999); I have not found it in the literature and treat it as new, with the same caveat.

The dissertation is a companion to the author's *Three Lemmas*, which develops the polynomial method in combinatorics and includes, in its Chapter 7, the case of *punctured* Kakeya sets (all but one point of a line in every direction). The present work uses the Dvir argument from there and nothing else from it.

## 1.4 Outline

Chapter 2 sets up the plane, the duality, and the theory of maximal arcs, and proves Denniston's theorem in full, since the equality case of the main problem rests on it. Chapter 3 proves Theorem A and the incidence identities behind it. Chapter 4 proves Theorem B. Chapter 5 proves Theorem C and computes $D(q)$. Chapter 6 treats odd $q$: the strict inequality, the deficiency in the range covered by Theorem C, and the data for the range not covered. Chapter 7 gives the constructions of Theorem E, proves Theorem D, and assembles the table of exact values. Chapter 8 concludes with open problems. Appendix A describes the computations.
# Chapter 2. Preliminaries: Planes, Duality, Arcs, and Kakeya Sets

## 2.1 The planes

$PG(2,q)$ has $q^2+q+1$ points and as many lines; every line has $q+1$ points, every point is on $q+1$ lines, two points lie on exactly one line, and two lines meet in exactly one point. Removing the line $\ell_\infty=[0:0:1]$ and its points leaves $AG(2,q)$: $q^2$ points $(x,y)=(x:y:1)$, and $q^2+q$ lines, each with $q$ points, falling into $q+1$ *parallel classes* of $q$ lines, one class for each point of $\ell_\infty$. The line $[u:v:w]$ with $(u,v)\ne(0,0)$ meets $\ell_\infty$ in the point $(v:-u:0)$, its *direction*. Concretely, the lines of direction $(1:s:0)$ are $y=sx+b$, $b\in\mathbb F_q$, and the lines of direction $(0:1:0)$ are $x=b$.

Two affine lines in different directions meet in exactly one affine point; two lines in the same direction are disjoint. These two facts, and the count of $q$ points per line, are all that Chapter 3 uses.

## 2.2 Duality

**Lemma 2.1 (The standard correlation).** *The map $\delta$ that sends the point $(a:b:c)$ to the line $[a:b:c]$ and the line $[u:v:w]$ to the point $(u:v:w)$ is a bijection of the points of $PG(2,q)$ onto its lines and of its lines onto its points, and it reverses incidence: $P\in L$ if and only if $\delta(L)\in\delta(P)$.*

*Proof.* The point $(a:b:c)$ lies on $[u:v:w]$ iff $au+bv+cw=0$, a condition symmetric in the two triples. ∎

Fix $O=(0:0:1)=\delta(\ell_\infty)$. Under $\delta$:

- the $q+1$ directions (points of $\ell_\infty$) become the $q+1$ lines through $O$;
- the $q$ affine lines of a direction $d$ become the $q$ points of the line $\delta(d)$ other than $O$;
- the $q^2$ affine points become the $q^2$ lines not through $O$;
- an affine point $P$ lies on an affine line $L$ iff the point $\delta(L)$ lies on the line $\delta(P)$.

Consequently an $r$-fold configuration $\mathcal L$ corresponds to a set $S=\delta(\mathcal L)$ of $r(q+1)$ points with $O\notin S$ and exactly $r$ points of $S$ on every line through $O$, and conversely. The multiplicity $m_P$ of an affine point is $|\delta(P)\cap S|$, and the union $U(\mathcal L)$ corresponds to the set of lines not through $O$ that meet $S$:
$$|U(\mathcal L)|=\#\{\text{lines }L\not\ni O:\ L\cap S\ne\emptyset\}.\tag{2.1}$$
I shall move freely between the two pictures, calling $\mathcal L$ and $S$ *dual* to each other.

## 2.3 Arcs and maximal arcs

**Definition 2.2.** A nonempty set $M$ of points of $PG(2,q)$ is a *maximal arc of degree $n$* if every line meets $M$ in $0$ or $n$ points.

The whole plane is a maximal arc of degree $q+1$; a single point, of degree $1$; the affine plane $AG(2,q)$ (the complement of a line), of degree $q$. These are the *trivial* maximal arcs. A maximal arc of degree $2$ is a set of $q+2$ points no three collinear, a *hyperoval*, and these exist iff $q$ is even (a conic together with its nucleus). The name comes from Barlotti (1955), who showed that a set of $k$ points meeting every line in at most $n$ points has $k\le(n-1)q+n$, with equality iff every line meets it in $0$ or $n$ points.

**Lemma 2.3.** *Let $M$ be a maximal arc of degree $n\le q$ in $PG(2,q)$. Then $|M|=(n-1)q+n$, and if $n>1$ then $n\mid q$.*

*Proof.* Take $P\in M$. The $q+1$ lines through $P$ each contain $n-1$ further points of $M$ and together cover $M\setminus\{P\}$, so $|M|=1+(q+1)(n-1)=(n-1)q+n$. Since $n\le q$, $M$ is not the whole plane; take $R\notin M$. The lines through $R$ that meet $M$ partition $M$ into sets of size $n$, so $n\mid(n-1)q+n$, i.e. $n\mid(n-1)q$, and since $\gcd(n,n-1)=1$, $n\mid q$. ∎

For $q$ even the divisibility condition is sufficient.

**Theorem 2.4 (Denniston 1969).** *Let $q=2^h$ and let $n$ divide $q$. Then $PG(2,q)$ contains a maximal arc of degree $n$.*

The proof uses three facts about $\mathbb F_q$, $q=2^h$, which I recall. The absolute trace $\operatorname{Tr}:\mathbb F_q\to\mathbb F_2$, $\operatorname{Tr}(a)=a+a^2+\dots+a^{2^{h-1}}$, is $\mathbb F_2$-linear, surjective, and satisfies $\operatorname{Tr}(a^2)=\operatorname{Tr}(a)$; its kernel $T_0$ is an additive subgroup of index $2$. Squaring is a bijection of $\mathbb F_q$. And for $\beta\in\mathbb F_q$ the polynomial $t^2+t+\beta$ is irreducible over $\mathbb F_q$ iff $\operatorname{Tr}(\beta)=1$ (Lidl and Niederreiter 1997, Thm 2.25 and Cor. 3.79; Hirschfeld 1998, §1.4).

*Proof.* Fix $\beta$ with $\operatorname{Tr}(\beta)=1$ and put $Q(x,y)=x^2+xy+\beta y^2$. Then $Q(x,y)=0$ only for $(x,y)=(0,0)$: if $y\ne0$ then $(x/y)^2+(x/y)+\beta=0$ contradicts irreducibility, and if $y=0$ then $x^2=0$. Let $\omega$ be a root of $t^2+t+\beta$ in $\mathbb F_{q^2}$; then $\omega+\omega^q=1$ and $\omega\omega^q=\beta$, so $Q(x,y)=(x+y\omega)(x+y\omega^q)=N(x+y\omega)$ is the norm from $\mathbb F_{q^2}$ to $\mathbb F_q$. The norm is a surjective homomorphism $\mathbb F_{q^2}^\times\to\mathbb F_q^\times$ with kernel of order $q+1$, so for each $\lambda\ne0$ the *conic* $C_\lambda=\{(x,y):Q(x,y)=\lambda\}$ has exactly $q+1$ points, and the $C_\lambda$ partition $AG(2,q)\setminus\{(0,0)\}$.

Let $A$ be an additive subgroup of $\mathbb F_q$ of order $n$ (an $\mathbb F_2$-subspace of dimension $\log_2n$) and define
$$K=\{(x,y)\in AG(2,q):Q(x,y)\in A\}=\{(0,0)\}\cup\bigcup_{\lambda\in A\setminus\{0\}}C_\lambda,$$
so $|K|=1+(n-1)(q+1)=(n-1)q+n$. I claim every line of $PG(2,q)$ meets $K$ in $0$ or $n$ points.

*The line at infinity* meets $K$ in $0$ points.

*Lines through the origin.* On $y=mx$ we have $Q(x,mx)=c_mx^2$ with $c_m=Q(1,m)\ne0$. Since $x\mapsto c_mx^2$ is a bijection of $\mathbb F_q$, the number of $x$ with $c_mx^2\in A$ is $|A|=n$. On $x=0$, $Q(0,y)=\beta y^2$, and likewise $n$ points.

*Lines not through the origin.* Consider $y=mx+c$ with $c\ne0$. Then
$$Q(x,mx+c)=x^2+x(mx+c)+\beta(mx+c)^2=c_mx^2+cx+\beta c^2=\varphi(x)+\beta c^2,$$
where $\varphi(x)=c_mx^2+cx$ is $\mathbb F_2$-linear with kernel $\{0,c/c_m\}$ of order $2$; so its image $H$ is an additive subgroup of index $2$ and every element of $H$ has exactly two preimages. Moreover $\beta c^2\notin H$: if $\varphi(x)=\beta c^2$ then $Q(x,mx+c)=0$, forcing $(x,mx+c)=(0,0)$ and $c=0$. Now the number of points of $K$ on the line is
$$\#\{x:\varphi(x)+\beta c^2\in A\}=\#\{x:\varphi(x)\in A+\beta c^2\}=2\,|H\cap(A+\beta c^2)|,$$
where $A+\beta c^2$ is the coset $\{a+\beta c^2:a\in A\}$. If $A\subseteq H$, then since $\beta c^2\notin H$ the coset $A+\beta c^2$ lies in the complement of $H$ and the count is $0$. If $A\not\subseteq H$, then $A\cap H$ has index $2$ in $A$, and $H\cap(A+\beta c^2)=\{a+\beta c^2:a\in A,\ a\in H+\beta c^2\}$ has $|A\setminus H|=n/2$ elements, because $H+\beta c^2$ is the complement of $H$; the count is $n$. The vertical lines $x=c\ne0$ are handled identically with $Q(c,y)=\beta y^2+cy+c^2$, $\varphi(y)=\beta y^2+cy$, and $c^2\notin\operatorname{im}\varphi$ because $Q(c,y)\ne0$.

So $K$ is a maximal arc of degree $n$. ∎

**Remark 2.5.** The proof shows more: for $n'\mid n$ one may take a subgroup $A'\le A$ of order $n'$, and then $K'=\{Q\in A'\}\subseteq K$ is a maximal arc of degree $n'$ contained in $K$. In particular every Denniston arc of degree $n\ge2$ contains a hyperoval $\{(0,0)\}\cup C_\lambda$ through the origin. This nesting is used in §7.2.

Denniston's are not the only maximal arcs in planes of even order: Thas (1974) and Mathon (2002) gave further constructions, and Hamilton and Mathon (2004) used Mathon's method to produce maximal arcs not of Denniston type for every degree $n\mid q$ with $4<n<q/2$. Only Denniston arcs are used here.

For $q$ odd the situation is the opposite.

**Theorem 2.6 (Ball, Blokhuis, and Mazzocca 1997).** *If $q$ is odd, $PG(2,q)$ contains no maximal arc of degree $n$ with $1<n<q$.*

The proof, and the shorter one of Ball and Blokhuis (1998), associates to a putative arc a polynomial over $\mathbb F_q$ and derives a contradiction from its degree and its vanishing; it is a polynomial-method argument in the sense of the companion dissertation, and I do not reproduce it. Lemma 2.3, Theorem 2.4, and Theorem 2.6 together give the complete existence theory: *a maximal arc of degree $n$, $1<n<q$, exists in $PG(2,q)$ if and only if $q$ is even and $n\mid q$.*

## 2.4 Kakeya sets

A *Kakeya set* in $AG(2,q)$ is a set containing a line in every direction; it is what I call a $1$-fold Kakeya set. Dvir (2009) proved that a Kakeya set in $\mathbb F_q^n$ has at least $\binom{q+n-1}{n}$ points, so at least $\binom{q+1}2$ in the plane. The exact value is due to Blokhuis and Mazzocca (2008):
$$\kappa_1(q)=\begin{cases}\dfrac{q(q+1)}2+\dfrac{q-1}2&q\text{ odd},\\[6pt]\dfrac{q(q+1)}2&q\text{ even},\end{cases}$$
the even case being attained exactly by the duals of hyperovals through $O$ and the odd case by a construction from a conic, which Blokhuis and Mazzocca also showed to be the only one (they state the classification for a dual oval, which for odd $q$ is a dual conic by Segre's theorem (1955)). The even case is the first instance of Theorem B: a hyperoval is a maximal arc of degree $2=r+1$. Blokhuis, De Boeck, Mazzocca, and Storme (2014) study the spectrum of sizes above the minimum and classify the smallest examples; Dover, Mellinger, and Scott (2014) consider Kakeya sets minimal under inclusion, which need not have minimum size.

The quantity $\kappa_r(q)$ is a minimum over configurations: every $r$-fold Kakeya set contains an $r$-fold configuration's union, and every such union is an $r$-fold Kakeya set. So
$$\kappa_r(q)=\min\{|U(\mathcal L)|:\mathcal L\text{ an }r\text{-fold configuration}\},$$
and I work with configurations throughout.

## 2.5 The polynomial method

The polynomial method proves lower bounds on $|U|$ by finding a nonzero polynomial of low degree vanishing on $U$ (by linear algebra, if $|U|$ is small) and showing that the structure of $U$ forces the degree to be large. Dvir's argument for Kakeya sets is the model (Guth 2016 is the general reference for the method; the companion dissertation develops it from three lemmas), and I state the form of it that will be needed. Say that a polynomial in $\mathbb F_q[x,y]$ is *reduced* if every exponent is at most $q-1$; every function $\mathbb F_q^2\to\mathbb F_q$ is represented by exactly one reduced polynomial, and the reduced polynomials of degree at most $d$ form a space of dimension
$$m_d=\#\{(i,j):0\le i,j\le q-1,\ i+j\le d\}.$$

**Proposition 2.7 (Dvir's argument for $r$-fold sets).** *Let $K$ be an $r$-fold Kakeya set in $AG(2,q)$, $r\ge1$. No nonzero polynomial of degree at most $q-1$ vanishes on $K$. Hence $|K|\ge\binom{q+1}2$.*

*Proof.* Suppose $P\ne0$ of degree $d\le q-1$ vanishes on $K$, and let $P_d$ be its homogeneous part of degree $d$; $d\ge1$ since $K\ne\emptyset$. For each direction $\mathbf b\ne\mathbf0$ choose a line $\{\mathbf a+t\mathbf b\}\subseteq K$; the univariate polynomial $P(\mathbf a+t\mathbf b)$ has degree at most $d<q$ and $q$ roots, so is zero, and its coefficient of $t^d$, which is $P_d(\mathbf b)$, vanishes. Thus $P_d$ vanishes at every point of $\mathbb F_q^2$ (at $\mathbf 0$ by homogeneity). A nonzero polynomial of degree $d<q$ has at most $dq<q^2$ zeros in $\mathbb F_q^2$, a contradiction. The bound follows because a set of fewer than $\binom{q+1}2$ points is the zero set of a nonzero polynomial of degree at most $q-1$, there being $\binom{q+1}2$ monomials of that degree. ∎

The argument uses one line per direction and nothing else, so it cannot distinguish $r=2$ from $r=1$. Chapter 7 (§7.4) shows that this is not an artefact of the proof: for the minimal configurations found by computation, the least degree of a nonzero reduced polynomial vanishing on $U$ is exactly the least $d$ with $m_d>|U|$, the degree at which such a polynomial exists for trivial reasons. Any improvement must therefore come from an argument that sees several lines per direction at once. The next chapter gives one, and it is not a polynomial argument.
# Chapter 3. The Counting Bound

Throughout this chapter $\mathcal L$ is an $r$-fold configuration in $AG(2,q)$ with union $U$ and multiplicities $m_P$, $1\le r\le q$.

## 3.1 Incidence identities

**Lemma 3.1.** *(a) $\displaystyle\sum_{P\in U}m_P=rq(q+1)$. (b) $\displaystyle\sum_{P\in U}\binom{m_P}2=r^2\binom{q+1}2$. (c) For every line $\ell\in\mathcal L$, $\displaystyle\sum_{P\in\ell}(m_P-1)=rq$.*

*Proof.* (a) counts incidences: $r(q+1)$ lines with $q$ points each. (b) counts pairs of lines meeting in a point: two lines of $\mathcal L$ meet iff they are not parallel, and there are $\binom{r(q+1)}2-(q+1)\binom r2=\frac{q+1}2\big(r^2(q+1)-r-r(r-1)\big)=r^2\frac{q(q+1)}2$ such pairs, each contributing $1$ to exactly one $\binom{m_P}2$. (c) The lines of $\mathcal L$ other than $\ell$ that meet $\ell$ are those not parallel to it, $r(q+1)-r=rq$ in number, and each meets $\ell$ in one point. ∎

## 3.2 The variance identity

**Theorem 3.2 (Theorem A).** *For every $r$-fold configuration,*
$$|U|=\frac{r}{r+1}\,q(q+1)+\frac{1}{(r+1)^2}\sum_{P\in U}\big(m_P-(r+1)\big)^2.\tag{3.1}$$
*In particular $|U|\ge\frac r{r+1}q(q+1)$, with equality if and only if $m_P=r+1$ for every $P\in U$.*

*Proof.* From Lemma 3.1, $\sum m_P=rq(q+1)$ and $\sum m_P^2=\sum m_P+2\sum\binom{m_P}2=rq(q+1)+r^2q(q+1)=r(r+1)q(q+1)$. Hence
$$\sum_{P\in U}(m_P-r-1)^2=\sum m_P^2-2(r+1)\sum m_P+(r+1)^2|U|=r(r+1)q(q+1)-2r(r+1)q(q+1)+(r+1)^2|U|,$$
i.e. $\sum(m_P-r-1)^2=(r+1)^2|U|-r(r+1)q(q+1)$, which rearranges to (3.1). The sum of squares is nonnegative and vanishes iff every $m_P$ equals $r+1$. ∎

The identity says that the "excess" of a configuration over the bound is a variance: the multiplicities have mean $\bar m=\sum m_P/|U|$ and, since $\sum m_P^2/\sum m_P=r+1$ exactly, the value $r+1$ is the mean of $m_P$ weighted by $m_P$; the configuration is extremal iff the multiplicities are constant. For $r=1$ the identity reads $|U|=\binom{q+1}2+\frac14\sum(m_P-2)^2$, which is the Bonferroni inequality $|U|\ge\sum|\ell|-\sum|\ell\cap\ell'|$ with an exact error term; the companion dissertation writes the same quantity as $\binom{q+1}2+\sum_P\binom{m_P-1}2$, and the two forms agree because of Lemma 3.1.

Write
$$\Delta(\mathcal L)=|U|-\frac r{r+1}q(q+1)=\frac1{(r+1)^2}\sum_{P\in U}d_P^2,\qquad d_P=m_P-(r+1),$$
for the *deficiency* of a configuration and $\Delta_r(q)=\kappa_r(q)-\frac r{r+1}q(q+1)$ for the deficiency of the extremal problem. Two constraints on the deviations $d_P$ will be useful.

**Lemma 3.3.** *(a) $\sum_{P\in U}d_P=-\frac1{r+1}\sum_{P\in U}d_P^2$. (b) For every $\ell\in\mathcal L$, $\sum_{P\in\ell}d_P=0$.*

*Proof.* (a) $\sum d_P=\sum m_P-(r+1)|U|=rq(q+1)-(r+1)|U|=-(r+1)\Delta(\mathcal L)$, and $\Delta=\sum d_P^2/(r+1)^2$. (b) By Lemma 3.1(c), $\sum_{P\in\ell}(d_P+r)=\sum_{P\in\ell}(m_P-1)=rq$ and $\ell$ has $q$ points. ∎

Part (b) says that on every line of the configuration the multiplicities are balanced around $r+1$: a point of multiplicity above $r+1$ on $\ell$ must be compensated by points of multiplicity below $r+1$ on the same line. Part (a) says that globally the deviations are negative on average, by an amount fixed by the deficiency.

## 3.3 Integrality

Since $|U|$ is an integer, $\kappa_r(q)\ge\lceil\frac r{r+1}q(q+1)\rceil$, and when $(r+1)\nmid q(q+1)$ the bound of Theorem A cannot be attained for arithmetic reasons alone. This is weaker than Theorem B, which excludes attainment for every odd $q$, but it explains some of the small values: for $q=4$, $r=2$ the bound is $13\frac13$ and $\kappa_2(4)=14$; for $q=5$, $r=3$ the bound is $22\frac12$ and $\kappa_3(5)=23$; for $q=7$, $r=4$ the bound is $44\frac45$ and $\kappa_4(7)=46$. In the first two cases the ceiling is attained; in the third it is not. A configuration with $|U|=\lceil\frac r{r+1}q(q+1)\rceil$ has $\sum d_P^2=(r+1)^2\big(\lceil\cdot\rceil-\frac r{r+1}q(q+1)\big)<(r+1)^2$, so its multiplicities are tightly concentrated about $r+1$: in the first two examples every $m_P$ lies in $\{r,r+1,r+2\}$, while in the third, where the ceiling is not attained, three points have multiplicity $r-1$ (§6.4). These near-extremal configurations are the objects one would like to understand in the odd case (Chapter 6).
# Chapter 4. Equality and Maximal Arcs

## 4.1 The dictionary

Let $\mathcal L$ be an $r$-fold configuration and $S=\delta(\mathcal L)$ its dual point set (§2.2): $O\notin S$, $|S|=r(q+1)$, and every line through $O$ contains exactly $r$ points of $S$. For a line $L$ not through $O$, $|L\cap S|$ is the multiplicity of the affine point $\delta(L)$, and (2.1) says $|U(\mathcal L)|$ is the number of lines not through $O$ that meet $S$.

**Lemma 4.1.** *Let $M=S\cup\{O\}$. Then every line through $O$ meets $M$ in exactly $r+1$ points, and for a line $L$ not through $O$, $|L\cap M|=|L\cap S|=m_{\delta(L)}$. In particular: every point of $U(\mathcal L)$ has multiplicity exactly $r+1$ if and only if $M$ is a maximal arc of degree $r+1$.*

*Proof.* The first two statements are immediate from the definition of $S$. If every $m_P\in\{0,r+1\}$ (multiplicity $0$ meaning $P\notin U$), then every line meets $M$ in $0$ or $r+1$ points, and $M\ne\emptyset$; conversely if $M$ is a maximal arc of degree $r+1$ then each $|L\cap S|\in\{0,r+1\}$ for $L\not\ni O$, i.e. each $m_P\in\{0,r+1\}$. ∎

The size check is reassuring: a maximal arc of degree $n=r+1$ has $(n-1)q+n=rq+r+1=r(q+1)+1=|S|+1$ points (Lemma 2.3).

## 4.2 The equality theorem

**Theorem 4.2 (Theorem B).** *An $r$-fold configuration $\mathcal L$ attains the bound $|U(\mathcal L)|=\frac r{r+1}q(q+1)$ if and only if $\delta(\mathcal L)\cup\{O\}$ is a maximal arc of degree $r+1$ in $PG(2,q)$. Conversely, if $M$ is a maximal arc of degree $r+1$ and $O$ is any point of $M$, then $\delta(M\setminus\{O\})$, computed in coordinates in which $O=(0:0:1)$, is an $r$-fold configuration attaining the bound.*

*Proof.* The first statement is Theorem 3.2 combined with Lemma 4.1. For the converse, choose a projective coordinate system with $O=(0:0:1)$; then every line through $O$ meets $M$ in $r+1$ points, so $S=M\setminus\{O\}$ has exactly $r$ points on each line through $O$ and $O\notin S$, and $\delta(S)$ is an $r$-fold configuration. Its multiplicities are the values $|L\cap S|$, $L\not\ni O$, which are $0$ or $r+1$; so every point of its union has multiplicity $r+1$ and Theorem 3.2 gives equality. ∎

**Corollary 4.3.** *$\kappa_r(q)=\frac r{r+1}q(q+1)$ if and only if $r\in\{q-1,q\}$, or $q$ is even and $(r+1)\mid q$. In all other cases, and in particular for every odd $q$ and every $1\le r\le q-2$, $\kappa_r(q)>\frac r{r+1}q(q+1)$.*

*Proof.* By Theorem 4.2, equality holds for some configuration iff a maximal arc of degree $n=r+1$ exists in $PG(2,q)$, with $2\le n\le q+1$. For $n=q+1$ the whole plane is such an arc; for $n=q$, the affine plane; these are $r=q$ and $r=q-1$. For $2\le n\le q-1$, existence holds iff $q$ is even and $n\mid q$, by Lemma 2.3, Theorem 2.4, and Theorem 2.6. ∎

Thus the equality cases of the counting bound are completely known, and the list is short. For $q=2^h$ they are $r+1\in\{2,4,\dots,2^h\}$ together with $r=q$; for $q$ odd, only $r\in\{q-1,q\}$. The strict inequality for odd $q$ rests on the Ball–Blokhuis–Mazzocca theorem and I know no elementary proof of it, even for $r=2$; the case $r=1$ is the classical statement that a $(q+2)$-set in $PG(2,q)$, $q$ odd, has three collinear points, which does have elementary proofs.

## 4.3 Examples

**Dual hyperovals ($r=1$, $q$ even).** A hyperoval $M$ through $O$ dualises to $q+1$ lines, one per direction, no three concurrent: $|U|=\binom{q+1}2$. This is the Blokhuis–Mazzocca minimum for even $q$, recovered.

**Pencil complements ($r=q-1$).** The affine plane $AG(2,q)$ is a maximal arc of degree $q$; choosing $O$ to be an affine point and dualising, one obtains all lines not through a fixed point $\delta(O)$, i.e. $q-1$ lines per direction, with union the plane minus that point: $|U|=q^2-1=\frac{q-1}q q(q+1)$. The same configuration is described directly in §7.1.

**Dual Denniston arcs.** For $q=2^h$ and $n\mid q$, the arc $K$ of Theorem 2.4 contains the origin, and dualising with $O$ the origin gives an $(n-1)$-fold configuration with $|U|=\frac{n-1}nq(q+1)$ and all multiplicities $n$. For $q=8$, $n=4$: $27$ lines, three per direction, union of $54$ points, every one on exactly four lines. This configuration was constructed explicitly (Appendix A.2) and its multiplicities verified. In odd order no such regularity is possible (Corollary 4.3); for comparison, the extremal $q=7$, $r=2$ configuration has points of multiplicity $1$, $2$, $3$, and $4$ (§6.4).

**Sub-configurations.** By Remark 2.5, a Denniston arc of degree $n$ contains Denniston arcs of every degree $n'\mid n$ through the origin, so the dual $(n-1)$-fold configuration contains $(n'-1)$-fold sub-configurations attaining their own bounds. A $3$-fold configuration in $AG(2,8)$ of the dual Denniston kind thus contains a dual hyperoval of $36$ points inside its $54$. Choosing $r$ lines per direction from the dual arc with $r+1\nmid n$ gives upper bounds for $\kappa_r(q)$ that turn out to be sharp in the one case that could be checked (§7.2).

## 4.4 Two remarks on the duality

First, the duality is *not* an isomorphism of extremal problems in general: the dual of an $r$-fold configuration has the specific form "$r$ points on each line of the pencil at $O$", and the quantity minimised is the number of lines meeting it, which is not a standard quantity for point sets. It becomes standard exactly in the equality case, where "no line meets $S\cup\{O\}$ in a number of points other than $0$ or $r+1$" is the definition of a maximal arc. This is why the equality case is fully understood while the near-equality cases are not: the theory of maximal arcs is rigid, and its stability version (how close to a maximal arc can a set be when no maximal arc exists?) is not part of it.

Second, the correspondence gives an interpretation of $\kappa_r(q)$ in the dual plane: $q^2-\kappa_r(q)$ is the largest number of lines not through $O$ that can be *skew* to a set with $r$ points on each line through $O$. For $r=1$ and $q$ odd, Blokhuis and Mazzocca's theorem says this is $(q-1)^2/2$, attained when the chosen lines are $q$ tangents of a conic together with one further line. In the dual plane $S$ then consists of $q$ points of a conic through $O$ together with a point $A\ne O$ on the tangent at $O$, and the skew lines are the $q(q-1)/2$ external lines of the conic other than the $(q-1)/2$ of them through $A$, which is how $(q-1)^2/2$ arises. For $r\ge2$ the maximisers are unknown beyond the computed cases.
# Chapter 5. Near the Top: Many Lines per Direction

When $r$ is close to $q$ it is convenient to think of the $q-r$ lines per direction that are *omitted* rather than the $r$ that are chosen. Write $s=q-r$.

## 5.1 Complements

**Lemma 5.1.** *Let $\mathcal L$ be an $r$-fold configuration and $\mathcal L^c$ the set of the $s(q+1)$ affine lines not in $\mathcal L$, $s=q-r$. A point $P$ lies outside $U(\mathcal L)$ if and only if all $q+1$ lines through $P$ belong to $\mathcal L^c$. Hence*
$$\kappa_{q-s}(q)=q^2-\tau_s(q),\qquad\tau_s(q):=\max\{|T|:T\subseteq AG(2,q)\text{ and every direction has at most }s\text{ lines meeting }T\}.$$

*Proof.* $P\notin U$ iff no line of $\mathcal L$ passes through $P$ iff every line through $P$ is omitted. Given $\mathcal L$, let $T=AG(2,q)\setminus U$; every line through a point of $T$ is omitted, so in each direction the lines meeting $T$ are among the $s$ omitted ones. Conversely, given $T$ with at most $s$ lines per direction meeting it, omit those lines together with enough further lines to make $s$ per direction; the resulting $\mathcal L$ has $T\cap U=\emptyset$, so $|U|\le q^2-|T|$. Minimising $|U|$ is therefore the same as maximising $|T|$. ∎

For $s=q-1$ this says $\kappa_1(q)=q^2-\tau_{q-1}(q)$, where $\tau_{q-1}(q)$ is the largest set missed by at least one line in every direction, i.e. the largest complement of a Kakeya set; the Blokhuis–Mazzocca theorem gives $\tau_{q-1}(q)=(q-1)^2/2$ for odd $q$ and $q(q-1)/2$ for even $q$. At the other end $\tau_1(q)=1$: if $T$ contains two points $P,Q$, then in every direction other than that of $PQ$ they lie on two distinct lines. The interesting question is where $\tau_s(q)$ stops being $s$.

## 5.2 Sets determining all directions

A set $T$ *determines* the direction $d$ if two points of $T$ lie on a common line of direction $d$. Let
$$D(q)=\min\{|T|:T\subseteq AG(2,q)\text{ determines all }q+1\text{ directions}\}.$$

Call a set $T$ *$s$-valid* if at most $s$ lines of every direction meet it, so that $\tau_s(q)$ is the largest size of an $s$-valid set.

**Lemma 5.2.** *(a) $\tau_s(q)\ge s$ for $1\le s\le q$. (b) Every subset of an $s$-valid set is $s$-valid. (c) A set $T$ with $|T|=s+1$ is $s$-valid if and only if $T$ determines all directions.*

*Proof.* (a) Take $s$ points on one line $M$: the direction of $M$ contributes one line, every other direction exactly $s$ lines. (b) is clear. (c) Since $|T|=s+1$, at most $s$ lines of direction $d$ meet $T$ iff two points of $T$ lie on a common line of direction $d$ iff $T$ determines $d$. ∎

**Lemma 5.3.** *$\tau_s(q)\ge s+1$ if and only if $D(q)\le s+1$.*

*Proof.* Suppose $\tau_s(q)\ge s+1$ and let $T$ be $s$-valid with $|T|\ge s+1$. By Lemma 5.2(b) any $(s+1)$-subset of $T$ is $s$-valid, and by 5.2(c) it determines all directions; so $D(q)\le s+1$. Conversely suppose $D(q)\le s+1$ and let $T_0$ be a determining set with $|T_0|=D(q)$. By Lemma 5.2(c), $T_0$ is met by at most $D(q)-1\le s$ lines in every direction. If $|T_0|=s+1$ we are done. Otherwise choose a line $M$ through two points of $T_0$ and let $T$ consist of $T_0$ together with $s+1-D(q)$ further points of $M$, which is possible since $M$ has $q\ge s+1$ points. In the direction of $M$ the lines meeting $T$ are those meeting $T_0$, at most $D(q)-1\le s$ of them. In any other direction each new point lies on a line of its own, so at most $(D(q)-1)+(s+1-D(q))=s$ lines meet $T$. Thus $T$ is $s$-valid with $|T|=s+1$. ∎

**Theorem 5.4 (Theorem C).** *For $1\le s\le D(q)-2$, $\tau_s(q)=s$ and hence $\kappa_{q-s}(q)=q^2-s$. For $s=D(q)-1$, $\tau_s(q)\ge s+1$ and $\kappa_{q-s}(q)\le q^2-s-1$.*

*Proof.* For $s\le D(q)-2$ we have $D(q)>s+1$, so $\tau_s(q)<s+1$ by Lemma 5.3, and $\tau_s(q)=s$ by Lemma 5.2(a); Lemma 5.1 gives $\kappa_{q-s}(q)=q^2-s$. For $s=D(q)-1$, Lemma 5.3 gives $\tau_s(q)\ge s+1$. ∎

## 5.3 A lower bound on $D(q)$

**Proposition 5.5.** *$D(q)\ge t_0(q):=\min\{t:\binom t2\ge q+1\}$. Consequently $\kappa_{q-s}(q)=q^2-s$ whenever $s(s+1)<2(q+1)$, in particular for all $s\le\sqrt{2q}-1$.*

*Proof.* A set of $t$ points determines at most $\binom t2$ directions, one for each pair, so a determining set has $\binom t2\ge q+1$ and $D(q)\ge t_0(q)$. If $s(s+1)<2(q+1)$ then $\binom{s+1}2<q+1$, so no $(s+1)$-set determines all directions, $D(q)\ge s+2$, and Theorem 5.4 applies. The last clause follows from $(\sqrt{2q}-1)\sqrt{2q}<2q<2(q+1)$. ∎

The bound $t_0(q)$ is $\lceil(1+\sqrt{8q+9})/2\rceil$; for $q=3,\dots,16$ it is $4,4,4,5,5,5,6,6,7$. A set attaining $D(q)=t_0(q)$ with $\binom{t_0}2=q+1$ exactly would have all its $\binom{t_0}2$ pair-directions distinct: no two of its joining lines parallel. Such sets exist for $q=5$ ($4$ points, $6$ directions) but, remarkably, not for $q=9$ ($5$ points, $10$ directions), as the next section shows.

## 5.4 Computing $D(q)$

$D(q)$ was computed by exhaustive search for $q\le16$ (Appendix A.4), using that the affine group is transitive on ordered pairs of points, so that a determining set may be assumed to contain $(0,0)$ and $(1,0)$. The results:

| $q$ | 3 | 4 | 5 | 7 | 8 | 9 | 11 | 13 | 16 |
|---|---|---|---|---|---|---|---|---|---|
| $t_0(q)$ | 4 | 4 | 4 | 5 | 5 | 5 | 6 | 6 | 7 |
| $D(q)$ | 4 | 4 | 4 | 5 | 5 | 6 | 6 | 6 | 7 |
| witness | $\{00,10,02,11\}$ | $\{00,10,02,11\}$ | $\{00,10,02,24\}$ | $\{00,10,02,03,36\}$ | $\{00,10,02,11,73\}$ | $\{00,10,02,03,04,38\}$ | $\{00,10,02,03,14,3\,10\}$ | $\{00,10,02,11,34,8\,11\}$ | $\{00,10,02,03,14,21,3\,13\}$ |

(Points are written $xy$; field elements of $\mathbb F_4,\mathbb F_8,\mathbb F_9,\mathbb F_{16}$ are encoded as integers as described in Appendix A.) The counting bound is attained except at $q=9$, where the search shows that no $5$-set of $AG(2,9)$ has ten pairwise non-parallel joining lines. I do not have a conceptual explanation of this; it would follow from a structural result on sets with no two parallel chords in $AG(2,9)$, and such sets ("no parallelograms and no trapezoids" in the language of the Euclidean problem) are a natural object of study in their own right.

**Corollary 5.6.** *The following values are exact:*

| $q$ | $\kappa_{q-s}(q)=q^2-s$ for | i.e. $r\ge$ |
|---|---|---|
| 3 | $s\le2$ | 1 |
| 4 | $s\le2$ | 2 |
| 5 | $s\le2$ | 3 |
| 7 | $s\le3$ | 4 |
| 8 | $s\le3$ | 5 |
| 9 | $s\le4$ | 5 |
| 11 | $s\le4$ | 7 |
| 13 | $s\le4$ | 9 |
| 16 | $s\le5$ | 11 |

*and in each case $\kappa_{q-s}(q)\le q^2-s-1$ for $s=D(q)-1$.*

The exhaustive computations of Chapter 7 confirm these where they overlap ($q\le7$: $\kappa_4(7)=46=49-3$, $\kappa_3(5)=23$, $\kappa_2(4)=14$, $\kappa_1(3)=7$, all $=q^2-s$), and give $\kappa_3(7)=44=49-5$ for $s=4=D(7)-1$, so $\tau_4(7)=5=s+1$: the upper bound of Theorem 5.4 is attained there. For $q=8$, $s=4$, Theorem 5.4 gives $\kappa_4(8)\le59$ and Theorem A gives $\kappa_4(8)\ge58$; the search of Appendix A did not decide between them.

## 5.5 The general bound on $\tau_s(q)$

For completeness, the counting argument of Theorem A, run in the complement picture, gives the general inequality
$$\tau_s(q)\le\frac{qs}{q+1-s}\qquad(1\le s\le q),\tag{5.1}$$
which is equivalent to $\kappa_{q-s}(q)\ge\frac{q-s}{q-s+1}q(q+1)$. It is tight at $s=q-1$ for even $q$ (dual hyperovals) and at $s=1$, and gives $\tau_s(q)\le s$ iff $s^2\le q$, a weaker threshold than Proposition 5.5. I note it because its proof is instructive: for a valid $T$ with $|T|=t$, each direction has at most $s$ lines meeting $T$, and by convexity the number of pairs of $T$ on lines of that direction is at least $t^2/(2s)-t/2$; summing over $q+1$ directions and comparing with $\binom t2$ gives (5.1). The direction-determination argument replaces convexity by the observation that a valid $(s+1)$-set must determine every direction, which is sharper because it uses the integrality of the line counts.
# Chapter 6. Odd Order

Write $b_r(q)=\frac r{r+1}q(q+1)$ for the bound of Theorem A and $\Delta_r(q)=\kappa_r(q)-b_r(q)$ for its deficiency.

## 6.1 Strictness

**Theorem 6.1.** *Let $q$ be odd and $1\le r\le q-2$. Then $\kappa_r(q)>b_r(q)$. Consequently $\kappa_r(q)\ge\lceil b_r(q)\rceil$, and $\kappa_r(q)\ge b_r(q)+1$ whenever $(r+1)\mid q(q+1)$.*

*Proof.* This is Corollary 4.3: equality would require a maximal arc of degree $r+1$ with $2\le r+1\le q-1$ in $PG(2,q)$, $q$ odd, which Theorem 2.6 excludes. The integrality statements follow. ∎

The divisibility condition holds for $r=1$ (always), for $r=2$ iff $q\equiv0,2\pmod3$, and in general depends on the residue of $q$ modulo $r+1$. For $q=5$, $r=2$ it holds and $\kappa_2(5)=21=b+1$; for $q=7$, $r=2$ it fails, $\lceil b\rceil=38$, and $\kappa_2(7)=40$. So the deficiency is sometimes exactly what arithmetic forces and sometimes more. The only proof I have of the strict inequality is through the Ball–Blokhuis–Mazzocca theorem, even for $r=2$, where the statement is that a set of $2(q+1)$ points with two on each line through $O$ cannot have all its other secants of length exactly three.

## 6.2 The deficiency near the top

**Proposition 6.2.** *For every $q$ and every $1\le s\le D(q)-2$,*
$$\Delta_{q-s}(q)=\frac{s(s-1)}{q+1-s}.$$

*Proof.* By Theorem 5.4, $\kappa_{q-s}(q)=q^2-s$, and
$$q^2-s-\frac{(q-s)q(q+1)}{q+1-s}=\frac{(q^2-s)(q+1-s)-(q-s)q(q+1)}{q+1-s}=\frac{s^2-s}{q+1-s},$$
since both products expand to $q^3+q^2-sq^2-sq$ plus, in the first, $s^2-s$. ∎

For $s=1$ this is $0$, as it must be ($r=q-1$ attains the bound). For $s\ge2$ it is positive, consistent with Corollary 4.3 (a maximal arc of degree $q-s+1$ with $2\le s\le q-1$ would need $q-s+1\mid q$, impossible), and it tends to $0$ as $q\to\infty$ with $s$ fixed. So in the regime $r=q-s$ the counting bound is asymptotically sharp for every $q$ but attained only at $s=1$. The extremal configuration of Theorem E(i) misses only the $s$ collinear points of $T$, and its multiplicities are $q-s$ or $q-s+1$ at the points off the line $M$ carrying $T$ and $q$ at the $q-s$ points of $M\setminus T$; the deficiency $s(s-1)/(q+1-s)$ is the variance of this distribution. The exact values for $q=7$ illustrate the formula: $\Delta_6=0$, $\Delta_5=\frac26=\frac13$, $\Delta_4=\frac65$, all confirmed by the search.

## 6.3 The deficiency for fixed $r$

The opposite regime, $r$ fixed and $q\to\infty$ through odd values, is where the problem is open. For $r=1$ the Blokhuis–Mazzocca theorem gives $\Delta_1(q)=\frac{q-1}2$: linear in $q$. The computed values for $r\ge2$ are few:

| $q$ | $\Delta_1$ | $\Delta_2$ | $\Delta_3$ | $\Delta_4$ | $\Delta_5$ | $\Delta_6$ | $\Delta_7$ |
|---|---|---|---|---|---|---|---|
| 3 | 1 | 0 | | | | | |
| 5 | 2 | 1 | $\frac12$ | 0 | | | |
| 7 | 3 | $\frac83$ | 2 | $\frac65$ | $\frac13$ | 0 | |
| 9 | 4 | $[1,5]$ | $[\frac12,\,?]$ | $[1,\,?]$ | 2 | $\frac67$ | $\frac14$ |

(For $q=9$, $r=2$ the search of Appendix A.1 did not finish; it found a configuration of $65$ points, and Theorem 6.1 gives $61$ as the lower bound. The $r=3,4$ entries are lower bounds from Theorem 6.1.)

In terms of the deviations $d_P=m_P-r-1$ of Chapter 3, $\Delta_r(q)=\frac1{(r+1)^2}\sum_Pd_P^2$, so a linear lower bound $\Delta_r(q)\ge c_rq$ would say that a set with $r$ points on each line of a pencil, in a plane of odd order, is forced to have at least $c_r(r+1)^2q$ units of "squared irregularity" among its other secants. For $r=1$ that is the Blokhuis–Mazzocca bound in its dual form: a $(q+2)$-set with an internal nucleus (a point of the set through which every line meets it in exactly one further point) in a plane of odd order meets at least $\binom{q+2}2+\frac{q-1}2$ lines (Blokhuis and Mazzocca 2008, Proposition 8), i.e. $\Delta_1(q)\ge\frac{q-1}2$. Their proof uses Segre's lemma of tangents, with which Bichara and Korchmáros (1982) had shown that such a set has at most two internal nuclei, together with the Jamison–Brouwer–Schrijver bound on affine blocking sets. For $r\ge2$ nothing of the kind seems to be known, and I state the question as the principal open problem of the dissertation.

**Question 6.3.** *For fixed $r\ge2$, does $\Delta_r(q)\to\infty$ as $q\to\infty$ through odd prime powers? Is $\Delta_r(q)\ge c_rq$ for some $c_r>0$?*

Two remarks bear on it. First, the two extremal configurations for $q=7$, $r=2$ found by the search and by the conic-pencil construction (§7.3) both have deficiency $\frac83$, and the pencil construction has deficiency $\approx\frac{q^2}{12}$ for large $q$ (§7.3), far more than linear; a linear-deficiency family, if one exists, must be of a different kind. Second, the near-extremal configurations of Chapter 3 (those with $|U|=\lceil b_r(q)\rceil$) have all multiplicities in $\{r,r+1,r+2\}$ in the cases computed, so the question is equivalent, for such configurations, to bounding below the number of points of multiplicity $\ne r+1$.

## 6.4 Spectra of the extremal configurations

The multiplicity spectra of the minimal configurations found for odd $q$ are:

| $q$ | $r$ | $\lvert U\rvert$ | spectrum $\{m:\#\}$ | deviations |
|---|---|---|---|---|
| 5 | 1 | 17 | $\{1{:}6,\ 2{:}9,\ 3{:}2\}$ | $-1,0,+1$ |
| 5 | 2 | 21 | $\{2{:}6,\ 3{:}12,\ 4{:}3\}$ | $-1,0,+1$ |
| 5 | 3 | 23 | $\{3{:}5,\ 4{:}15,\ 5{:}3\}$ | $-1,0,+1$ |
| 7 | 2 | 40 | $\{1{:}2,\ 2{:}10,\ 3{:}22,\ 4{:}6\}$ | $-2,-1,0,+1$ |
| 7 | 3 | 44 | $\{2{:}3,\ 3{:}11,\ 4{:}21,\ 5{:}9\}$ | $-2,-1,0,+1$ |
| 7 | 4 | 46 | $\{3{:}3,\ 4{:}9,\ 5{:}25,\ 6{:}9\}$ | $-2,-1,0,+1$ |

In every case the deviations lie in $\{-2,-1,0,+1\}$, with $+1$ the only positive value: the extremal configurations have no point of multiplicity above $r+2$, and their deficiency is carried mostly by points of multiplicity $r$ and $r+2$. Lemma 3.3(b) says that on each line the deviations sum to zero, so each point of multiplicity $r+2$ on a line is balanced on that line by points of multiplicity $r$ or $r-1$. Whether extremal configurations always have deviations bounded independently of $q$ is a natural sub-question of Question 6.3; the $r=1$ case says yes ($\{-1,0,+1\}$ for the conic construction).
# Chapter 7. Constructions and Exact Values

## 7.1 Pencil complements

**Proposition 7.1.** *Let $T\subseteq AG(2,q)$ be $s$-valid (at most $s$ lines of every direction meet $T$), $1\le s\le q$. Then $\kappa_{q-s}(q)\le q^2-|T|$. In particular, taking $T$ to be $s$ collinear points, $\kappa_{q-s}(q)\le q^2-s$ for $1\le s\le q$.*

*Proof.* In each direction choose $q-s$ lines that miss $T$, which is possible since at most $s$ lines of that direction meet $T$. The chosen lines form a $(q-s)$-fold configuration whose union avoids $T$. ∎

For $s=1$ this is the pencil complement of §4.3, the lines avoiding one point, with union of size $q^2-1$, attaining Theorem A. For $s=q-1$ it is the tautology $\kappa_1(q)\le q^2-|T|$ for $T$ the complement of a Kakeya set. Theorem 5.4 says that for $s\le D(q)-2$ the collinear choice is optimal.

## 7.2 Dual Denniston arcs and their sub-configurations

**Proposition 7.2.** *Let $q=2^h$ and $n\mid q$, $n\ge2$. The dual of a Denniston arc of degree $n$ (Theorem 2.4) with respect to its origin is an $(n-1)$-fold configuration attaining Theorem A, with all multiplicities $n$. For every $n'\mid n$ it contains an $(n'-1)$-fold sub-configuration attaining Theorem A. Hence $\kappa_{n-1}(q)=\frac{n-1}nq(q+1)$ for all $n\mid q$.*

*Proof.* Theorem 4.2 and Remark 2.5. ∎

The construction was carried out explicitly (Appendix A.2). For $q=8$ and $n=4$ one may take $\beta=1$ (since $\operatorname{Tr}(1)=1$ in $\mathbb F_8$) and $A=\{0,1,x,x+1\}$ in $\mathbb F_8=\mathbb F_2[x]/(x^3+x+1)$. The arc has $28$ points; its $63$ affine secants each carry $4$ points and its other $9$ affine lines none. The dual configuration has $27$ lines, $3$ per direction, union of $54$ points, every one of multiplicity $4$. For $q=16$, $n=4$, with $\beta$ of trace $1$ and $A$ the span of $1$ and $x$: $52$ points, dual union $204$, all multiplicities $4$.

Choosing $r<n-1$ lines per direction *inside* the dual arc gives an $r$-fold configuration whose union is a subset of the arc's union, and one may minimise over the $\binom{n-1}r^{q+1}$ choices. For $q=8$, $n=4$, $r=2$ the minimum over the $3^9$ choices is $51$, with spectrum $\{2{:}18,\ 3{:}24,\ 4{:}9\}$; the exhaustive search over *all* $2$-fold configurations of $AG(2,8)$ (Appendix A.1) also gives $51$, with a different spectrum $\{1{:}2,\ 2{:}12,\ 3{:}30,\ 4{:}7\}$. So $\kappa_2(8)=51$, and the dual Denniston arc contains an optimal $2$-fold sub-configuration. For $q=16$, $n=4$, $r=2$ the minimum over $3^{17}$ choices is $194$, against the bound $181\frac13$; whether $\kappa_2(16)=194$ is open.

## 7.3 Pencils of conics for odd $q$

**Theorem 7.3.** *Let $q$ be odd, $\beta\in\mathbb F_q$ a non-square, $Q(x,y)=x^2-\beta y^2$, and for $\lambda\ne0$ let $C_\lambda=\{(x,y):Q(x,y)=\lambda\}$. Then:*

*(a) Each $C_\lambda$ has $q+1$ points, and the $C_\lambda$ partition $AG(2,q)\setminus\{O\}$, $O=(0,0)$.*

*(b) Every line through $O$ meets $C_\lambda$ in $0$ or $2$ points. The set of lines through $O$ that meet $C_\lambda$ depends only on whether $\lambda$ is a square; the two classes give complementary sets of $\frac{q+1}2$ lines each.*

*(c) Let $r$ be even and let $\Lambda$ consist of $r/2$ non-zero squares and $r/2$ non-squares. Then $S=\bigcup_{\lambda\in\Lambda}C_\lambda$ has exactly $r$ points on every line through $O$, so its dual (with respect to $O$) is an $r$-fold configuration.*

*Proof.* (a) $Q$ is the norm form of $\mathbb F_{q^2}=\mathbb F_q(\sqrt\beta)$ over $\mathbb F_q$: $N(x+y\sqrt\beta)=x^2-\beta y^2$. The norm is a surjective homomorphism $\mathbb F_{q^2}^\times\to\mathbb F_q^\times$ with fibres of size $q+1$, and $Q(x,y)=0$ only at $O$ since $\beta$ is a non-square.

(b) On the line $y=mx$, $Q=x^2(1-\beta m^2)$, and $1-\beta m^2\ne0$ since $\beta$ is a non-square; $x^2(1-\beta m^2)=\lambda$ has two solutions if $\lambda(1-\beta m^2)$ is a non-zero square and none otherwise. On $x=0$, $Q=-\beta y^2=\lambda$ has two solutions iff $-\lambda\beta$ is a square. In both cases the condition is "$\lambda\cdot\gamma\in\square$" for a fixed $\gamma$ depending on the line, and replacing $\lambda$ by $\lambda\nu$ with $\nu$ a non-square negates it. Since $C_\lambda$ has $q+1$ points and each line through $O$ meets it in $0$ or $2$, exactly $\frac{q+1}2$ lines through $O$ meet it.

(c) By (b), each line through $O$ meets every conic of one of the two classes in $2$ points and no conic of the other class; with $r/2$ conics in each class it meets $S$ in $2\cdot\frac r2=r$ points. The conics are disjoint by (a) and $O\notin S$. ∎

**Remark 7.4.** A line $y=ax+c$ with $c\ne0$ meets $C_\lambda$ iff the quadratic $(1-\beta a^2)x^2-2\beta acx-\beta c^2-\lambda$ has a root, i.e. iff its discriminant $4\big(\beta c^2+\lambda(1-\beta a^2)\big)$ is a square or zero. Writing $u=\beta c^2$ and $v=1-\beta a^2$, the line is skew to all of $S$ iff $u+\lambda v$ is a non-square for every $\lambda\in\Lambda$. For $r$ "random-looking" values of $\lambda$ one expects about a $2^{-r}$ fraction of the $q^2-q$ lines $y=ax+c$, $c\ne0$, to be skew, so $|U|\approx(1-2^{-r})q^2$. For $r=2$ this is $\frac34q^2$, above the bound $\frac23q^2$ by a constant factor: the construction is not asymptotically optimal. It is, however, exactly optimal at $q=7$.

The minimum of $|U|$ over all admissible choices of $\Lambda$ was computed (Appendix A.3):

| $q$ | $r$ | choices | $\min\lvert U\rvert$ | $b_r(q)$ | $\kappa_r(q)$ |
|---|---|---|---|---|---|
| 5 | 2 | 4 | 24 | 20 | 21 |
| 7 | 2 | 9 | 40 | $37\frac13$ | **40** |
| 7 | 4 | 9 | 48 | $44\frac45$ | 46 |
| 9 | 2 | 16 | 70 | 60 | $\le65$ |
| 9 | 4 | 36 | 80 | 72 | $\le79$ |
| 11 | 2 | 25 | 96 | 88 | ? |
| 11 | 4 | 100 | 108 | $105\frac35$ | ? |
| 13 | 2 | 36 | 140 | $121\frac13$ | ? |

For $q=7$, $r=2$, the optimal pencil configuration has spectrum $\{2{:}16,\ 3{:}16,\ 4{:}8\}$, different from the spectrum $\{1{:}2,\ 2{:}10,\ 3{:}22,\ 4{:}6\}$ of the search's optimum; both have deficiency $\frac83$. So the $2$-fold extremal problem for $q=7$ has at least two inequivalent solutions.

## 7.4 The reach of the polynomial method

Proposition 2.7 says that no polynomial of degree less than $q$ vanishes on an $r$-fold Kakeya set. The counting lemma of the polynomial method says that a nonzero *reduced* polynomial of degree at most $d$ vanishing on $U$ exists as soon as $m_d>|U|$, where $m_d$ is the number of reduced monomials of degree at most $d$; write $d^\ast(U)=\min\{d:m_d>|U|\}$ for this trivial threshold and $\delta(U)$ for the least degree of a nonzero reduced polynomial vanishing on $U$. Then $q\le\delta(U)\le d^\ast(U)$. In this form the method proves $|U|\ge m_d$ for every $d$ with $\delta(U)>d$: Proposition 2.7 gives $\delta(U)\ge q$, hence $|U|\ge m_{q-1}=\binom{q+1}2$, and more would follow only from a proof that $\delta(U)>q$.

**Proposition 7.5 (Theorem D).** *For each minimal configuration in the following table, $\delta(U)=d^\ast(U)$; that is, the points of $U$ impose independent conditions on reduced polynomials of every degree below $d^\ast(U)$.*

| $q$ | $r$ | $\lvert U\rvert$ | $m_{q-1}$ | $m_d$ around $d^\ast$ | $d^\ast(U)$ | $\delta(U)$ | kernel dimension at $\delta$ |
|---|---|---|---|---|---|---|---|
| 5 | 2 | 21 | 15 | $m_5=19,\ m_6=22$ | 6 | 6 | 1 |
| 7 | 1 | 32 | 28 | $m_7=34$ | 7 | 7 | 2 |
| 7 | 2 | 40 | 28 | $m_8=39,\ m_9=43$ | 9 | 9 | 3 |
| 7 | 3 | 44 | 28 | $m_9=43,\ m_{10}=46$ | 10 | 10 | 2 |
| 7 | 4 | 46 | 28 | $m_{10}=46,\ m_{11}=48$ | 11 | 11 | 2 |

*Proof.* Computation (Appendix A.5): for each $d$ the rank of the evaluation matrix of the reduced monomials of degree $\le d$ at the points of $U$ was computed over $\mathbb F_q$; it equals $\min(|U|,m_d)$ in every case, so the kernel is nonzero exactly when $m_d>|U|$, with dimension $m_d-|U|$. ∎

(The $r=1$ row uses a $32$-point $1$-fold configuration, one point above the minimum; the minimal $31$-point configurations behave the same way, with $\delta=7$ and kernel dimension $3$.) The table shows that the "zeros" half of the polynomial method, which must show that $U$ cannot be the zero set of a polynomial of the degree that counting provides, has nothing to work with for $r\ge2$ beyond degree $q$: the polynomials of degree $d^\ast(U)>q$ that vanish on the optimal $r$-fold unions exist for the trivial reason and there are exactly as many of them as counting predicts. To reproduce Theorem A by the polynomial method one would have to prove $\delta(U)\ge d_r(q)$ with $m_{d_r(q)}\approx\frac r{r+1}q^2$. Since $m_d=q^2-\binom{2q-1-d}2$ for $d\ge q-1$, this means $d_r(q)\approx q\big(2-\sqrt{2/(r+1)}\big)$, about $1.18q$ for $r=2$: a statement about polynomials of degree well above $q$ vanishing on unions of lines, which is the territory of Rédei-type and lacunary polynomials (Rédei 1970; Ball, Blokhuis, and Mazzocca 1997) rather than of the restriction-to-lines argument.

## 7.5 Table of exact values

The following table collects everything known to me about $\kappa_r(q)$ for $q\le9$ and $q=16$. Provenance: **A** equality in Theorem A (Corollary 4.3); **C** Theorem 5.4; **E** exhaustive search (Appendix A.1); **BM** Blokhuis and Mazzocca (2008); **D** dual Denniston sub-configuration (§7.2); a range gives the best lower and upper bounds known.

| $q$ | $r$ | $\kappa_r(q)$ | $b_r(q)$ | provenance | spectrum of an extremal configuration |
|---|---|---|---|---|---|
| 3 | 1 | 7 | 6 | BM, E | $\{1{:}3,2{:}3,3{:}1\}$ |
| 3 | 2 | 8 | 8 | A, E | $\{3{:}8\}$ |
| 4 | 1 | 10 | 10 | A, E | $\{2{:}10\}$ |
| 4 | 2 | 14 | $13\frac13$ | C, E | $\{2{:}4,3{:}8,4{:}2\}$ |
| 4 | 3 | 15 | 15 | A, E | $\{4{:}15\}$ |
| 5 | 1 | 17 | 15 | BM, E | $\{1{:}6,2{:}9,3{:}2\}$ |
| 5 | 2 | 21 | 20 | E | $\{2{:}6,3{:}12,4{:}3\}$ |
| 5 | 3 | 23 | $22\frac12$ | C, E | $\{3{:}5,4{:}15,5{:}3\}$ |
| 5 | 4 | 24 | 24 | A, E | $\{5{:}24\}$ |
| 7 | 1 | 31 | 28 | BM | |
| 7 | 2 | 40 | $37\frac13$ | E | $\{1{:}2,2{:}10,3{:}22,4{:}6\}$ |
| 7 | 3 | 44 | 42 | E | $\{2{:}3,3{:}11,4{:}21,5{:}9\}$ |
| 7 | 4 | 46 | $44\frac45$ | C, E | $\{3{:}3,4{:}9,5{:}25,6{:}9\}$ |
| 7 | 5 | 47 | $46\frac23$ | C | |
| 7 | 6 | 48 | 48 | A | $\{7{:}48\}$ |
| 8 | 1 | 36 | 36 | A | $\{2{:}36\}$ |
| 8 | 2 | 51 | 48 | E, D | $\{1{:}2,2{:}12,3{:}30,4{:}7\}$ |
| 8 | 3 | 54 | 54 | A, D | $\{4{:}54\}$ |
| 8 | 4 | 58 or 59 | $57\frac35$ | A; C | |
| 8 | 5 | 61 | $60\frac23$ | C | |
| 8 | 6 | 62 | $61\frac57$ | C | |
| 8 | 7 | 63 | 63 | A | $\{8{:}63\}$ |
| 9 | 1 | 49 | 45 | BM | |
| 9 | 2 | 61 to 65 | 60 | Thm 6.1; search | $\{1{:}2,2{:}24,3{:}26,4{:}13\}$ (65) |
| 9 | 3 | $\ge68$ | $67\frac12$ | Thm 6.1 | |
| 9 | 4 | $\ge73$ | 72 | Thm 6.1 | |
| 9 | 5 | 77 | 75 | C | |
| 9 | 6 | 78 | $77\frac17$ | C | |
| 9 | 7 | 79 | $78\frac34$ | C | |
| 9 | 8 | 80 | 80 | A | |
| 16 | 1 | 136 | 136 | A | |
| 16 | 2 | 182 to 194 | $181\frac13$ | A; D | |
| 16 | 3 | 204 | 204 | A, D | |
| 16 | 7 | 238 | 238 | A | |
| 16 | 11–15 | $256-s$ | | C ($s\le5$) | |
| 16 | 16 | 256 | 256 | A | |

Every equality case of Theorem A in the table is one predicted by Corollary 4.3, and every case predicted by Corollary 4.3 with $q\le9$ or $q=16$ appears as an equality (the trivial case $r=q$, where $U$ is the whole plane, is listed only for $q=16$).
# Chapter 8. Conclusion

The question was small: how few points can contain $r$ lines in every direction of a finite plane? The answer turned out to have three parts of quite different character.

The first part is an identity. The size of a union of $r$ lines per direction exceeds $\frac r{r+1}q(q+1)$ by exactly the variance of its multiplicities about $r+1$, so the union is smallest when the multiplicities are constant, and then it is a dual maximal arc. Everything about the equality case follows from the existence theory of maximal arcs: attained for even $q$ whenever $r+1$ divides $q$, never attained for odd $q$ in the range $1\le r\le q-2$. The Ball–Blokhuis–Mazzocca theorem that decides the odd case is a polynomial-method theorem, while the direct polynomial method, as Chapter 7 shows, cannot see past $r=1$. I find this the most instructive feature of the problem: the method's power over finite fields comes from polynomials of degree below $q$, and an $r$-fold union is the zero set of nothing of that degree, yet the method reappears once the problem is dualised, in the guise of a nonexistence theorem about polynomials of degree far above $q$.

The second part is exact and elementary. Near $r=q$ the problem is about the points that all of the omitted lines pass through, and it is solved by the observation that $s+1$ points can be avoided by $q-s$ lines in every direction only if they determine every direction. The threshold at which the naive answer $q^2-s$ fails is the least size $D(q)$ of a set determining all directions, a quantity that seems not to have been studied and that I could compute only for $q\le16$, where it equals the obvious counting bound except at $q=9$.

The third part is open. For odd $q$ and fixed $r\ge2$ the deficiency $\kappa_r(q)-\frac r{r+1}q(q+1)$ is positive, but I cannot show that it grows with $q$, let alone linearly as it does for $r=1$. The constructions I have, from pencils of conics, are optimal at $q=7$ and far from optimal asymptotically. The data suggest that extremal configurations have multiplicities within two of $r+1$; if that could be proved, the deficiency question would become a counting problem about sets of type $(r-1,r,r+1,r+2)$ with respect to a pencil.

**Open problems.**

1. For odd $q$ and fixed $r\ge2$, determine the order of growth of $\Delta_r(q)=\kappa_r(q)-\frac r{r+1}q(q+1)$ (Question 6.3). The first case is $\kappa_2(q)$ for odd $q$; the first unknown value is $\kappa_2(9)\in[61,65]$.
2. For $q=2^h$ and $(r+1)\nmid q$, determine $\kappa_r(q)$; the first cases are $\kappa_2(2^h)$, known only for $h\le3$ ($14$ and $51$), and $\kappa_4(8)\in\{58,59\}$.
3. Determine $D(q)$ in general. Is $D(q)=t_0(q)=\lceil(1+\sqrt{8q+9})/2\rceil$ for all $q\ne9$? What is special about $AG(2,9)$, in which no five points have ten pairwise non-parallel joining lines?
4. Determine $\tau_s(q)$ for $D(q)-1\le s\le q-2$, equivalently $\kappa_r(q)$ for $2\le r\le q+1-D(q)$; the data for $q=7$ ($\tau_4=5$, $\tau_5=9$) and $q=8$ ($\tau_5=10$, $\tau_6=13$) show that $\tau_s$ grows quickly once it leaves $s$.
5. Classify the extremal $2$-fold configurations for odd $q$, as Blokhuis and Mazzocca did for $r=1$. For $q=7$ there are at least two inequivalent ones.
6. Extend to $AG(n,q)$, $n\ge3$, where lines in different directions need not meet and the counting identity of Chapter 3 has no direct analogue; the relation to the Furstenberg-set problem of Ellenberg and Erman (2016) and Dhar, Dvir, and Lund (2021), which also concerns sets containing many points of many lines, should be clarified.

The companion dissertation argued that the polynomial method rests on three lemmas and that its applications differ in the bridge between them. The present problem shows a fourth thing: sometimes the bridge does not exist, the method gives only its trivial bound, and the answer comes from elsewhere. But "elsewhere" was itself built with polynomials.
# Appendix A. Computations

All computations were performed in JavaScript (Node.js 22) on a laptop. The fields $\mathbb F_4,\mathbb F_8,\mathbb F_9,\mathbb F_{16}$ were represented as $\mathbb F_2[x]/(x^2+x+1)$, $\mathbb F_2[x]/(x^3+x+1)$, $\mathbb F_3[x]/(x^2+1)$, $\mathbb F_2[x]/(x^4+x+1)$, with an element $\sum a_ix^i$ encoded as the integer $\sum a_ip^i$; the witnesses in §5.4 use this encoding. Lines of direction $(1:s:0)$ are $\{(t,\,b+st):t\in\mathbb F_q\}$ and lines of direction $(0:1:0)$ are $\{(b,t)\}$.

## A.1 Exhaustive search for $\kappa_r(q)$

The program enumerates $r$-fold configurations direction by direction, choosing an $r$-subset of the $q$ lines of each direction, maintaining the multiplicity of every point and the current union size, and abandoning a branch as soon as the union is at least the best size found (the union can only grow). Symmetry is used in the two coordinate directions: the maps $(x,y)\mapsto(\lambda x+\mu,\ \nu y+\rho)$, $\lambda\nu\ne0$, permute the parallel classes and preserve union sizes, and they act on the lines $y=b$ of direction $(1:0:0)$ through the affine group of $\mathbb F_q$, which is transitive on ordered pairs of distinct elements; so for $r\ge2$ the chosen lines in that direction may be assumed to include $y=0$ and $y=1$, and independently those in direction $(0:1:0)$ may be assumed to include $x=0$ and $x=1$; for $r=1$, translations give $y=0$ and $x=0$. The number of configurations examined is therefore $\binom{q-2}{r-2}^2\binom qr^{q-1}$ before pruning.

| $q$ | $r$ | result | status | time |
|---|---|---|---|---|
| 3 | 1, 2 | 7, 8 | exhaustive | $<1$ ms |
| 4 | 1, 2, 3 | 10, 14, 15 | exhaustive | $<1$ ms |
| 5 | 1, 2, 3, 4 | 17, 21, 23, 24 | exhaustive | $<10$ ms |
| 7 | 2 | 40 | exhaustive | 0.3 s |
| 7 | 3 | 44 | exhaustive | 1.4 s |
| 7 | 4 | 46 | exhaustive | 0.5 s |
| 8 | 2 | 51 | exhaustive | 35 s |
| 8 | 4 | $\le64$ | stopped after 600 s in the first branch | |
| 9 | 2 | $\le65$ | stopped after 600 s | |

The pruning is effective when $r$ is small relative to $q$; for $q=8$, $r=4$ the $\binom84=70$ subsets per direction defeat it. The extremal configurations reported in Chapter 7 are, in the notation "$b_1b_2\cdots\mid\cdots$" listing the chosen $b$-values per direction $(1:0:0),(1:1:0),\dots,(1:q-1:0),(0:1:0)$:

- $q=5$, $r=2$: $01\mid01\mid23\mid24\mid34\mid01$;
- $q=7$, $r=2$: $01\mid01\mid03\mid12\mid23\mid56\mid45\mid01$;
- $q=7$, $r=3$: $012\mid012\mid034\mid123\mid236\mid056\mid456\mid013$;
- $q=7$, $r=4$: $0123\mid0123\mid0345\mid1245\mid0234\mid1456\mid0456\mid0134$;
- $q=8$, $r=2$: $01\mid02\mid05\mid34\mid17\mid34\mid26\mid15\mid01$;
- $q=9$, $r=2$ (65 points): $01\mid01\mid34\mid35\mid45\mid67\mid78\mid68\mid01\mid01$.

## A.2 Denniston arcs and their duals

For $q=2^h$ and $n\mid q$ the program finds $\beta$ with $\operatorname{Tr}(\beta)=1$, takes $A$ to be the span of $1,x,\dots$ (as $\mathbb F_2$-subspace of dimension $\log_2n$), forms $K=\{(x,y):x^2+xy+\beta y^2\in A\}$, and checks $|K|=(n-1)q+n$ and that every affine line meets $K$ in $0$ or $n$ points. It then forms the dual lines $xX+yY+1=0$ for $(x,y)\in K\setminus\{(0,0)\}$, whose direction is $(y:x:0)$ in characteristic $2$, verifies that there are $n-1$ per direction, and computes the union and its multiplicities. Results: $(q,n)=(4,2)$: $|K|=6$, dual union $10$, all multiplicities $2$. $(8,2)$: $10$, $36$, all $2$. $(8,4)$: $\beta=1$, $|K|=28$, line intersections $\{0{:}9,\ 4{:}63\}$, dual union $54$, all multiplicities $4$. $(16,4)$: $\beta=8$ (i.e. $x^3$), $|K|=52$, intersections $\{0{:}51,\ 4{:}221\}$, dual union $204$, all multiplicities $4$. Sub-configurations with $r$ lines per direction chosen inside the dual arc were minimised exhaustively over $\binom{n-1}r^{q+1}$ choices: $(8,4)$: $r=1$: $36$; $r=2$: $51$. $(16,4)$: $r=1$: $136$; $r=2$: $194$.

## A.3 Pencils of conics

For odd $q$ the program takes the least non-square $\beta$, the conics $C_\lambda=\{x^2-\beta y^2=\lambda\}$, and, for even $r$, every choice of $r/2$ squares and $r/2$ non-squares as $\Lambda$; it forms the dual lines of the points of $\bigcup_{\lambda\in\Lambda}C_\lambda$, checks that there are $r$ per direction, and records the smallest union. The values are in §7.3.

## A.4 The direction-determination number $D(q)$

Since the affine group is transitive on ordered pairs of distinct points, a determining set may be assumed to contain $(0,0)$ and $(1,0)$. For $t=2,3,\dots$ the program searches depth-first for $t$-sets containing these two points that determine all $q+1$ directions, maintaining a count of determined directions and pruning a branch when the remaining points cannot determine enough new directions (a $k$-th point adds at most $k-1$). All runs took under a second; $D(q)$ is the least $t$ for which a set is found, and its non-existence for smaller $t$ is exhaustive.

## A.5 Vanishing degrees

For the prime fields $\mathbb F_5$ and $\mathbb F_7$ and a configuration given by its choice string, the program lists the reduced monomials $x^iy^j$ ($0\le i,j\le q-1$, $i+j\le d$), forms the evaluation matrix at the points of $U$, and computes its rank by Gaussian elimination modulo $q$. A nonzero reduced polynomial of degree $\le d$ vanishing on $U$ exists iff the rank is less than the number of monomials, and the kernel dimension is the difference. The results are in §7.4.

## A.6 Program (core of the search)

```
// r-fold Kakeya sets in AG(2,q): minimum union of r lines per direction (core; field tables omitted)
const q = Number(process.argv[2]), r = Number(process.argv[3]);
// lines[d][b]: point indices of the b-th line in direction d (d = 0..q-1 slopes, d = q vertical)
function subsets(mustContain) {            // r-subsets of {0..q-1}, optionally forced to contain 0 and 1
  const out = [], fixed = mustContain ? (r === 1 ? [0] : [0, 1]) : [];
  (function rec(start, cur) {
    if (cur.length === r) { out.push(cur.slice()); return; }
    for (let b = start; b < q; b++) { cur.push(b); rec(b + 1, cur); cur.pop(); }
  })(fixed.length, fixed.slice());
  return out;
}
const allSubs = subsets(false), fixedSubs = subsets(true);
const cnt = new Int32Array(q * q); let size = 0, best = Infinity;
(function rec(d) {
  if (size >= best) return;                  // the union only grows
  if (d === q + 1) { best = size; return; }
  const subs = (d === 0 || d === q) ? fixedSubs : allSubs;   // symmetry in the two axis directions
  for (const S of subs) {
    for (const b of S) for (const P of lines[d][b]) if (cnt[P]++ === 0) size++;
    rec(d + 1);
    for (const b of S) for (const P of lines[d][b]) if (--cnt[P] === 0) size--;
  }
})(0);
console.log(q, r, best);
```
# Bibliography

Ball, S., and Blokhuis, A. (1998). "An Easier Proof of the Maximal Arcs Conjecture." *Proceedings of the American Mathematical Society* 126(11): 3377–3380.

Ball, S., Blokhuis, A., Brouwer, A. E., Storme, L., and Szőnyi, T. (1999). "On the Number of Slopes of the Graph of a Function Defined on a Finite Field." *Journal of Combinatorial Theory, Series A* 86(1): 187–196.

Ball, S., Blokhuis, A., and Mazzocca, F. (1997). "Maximal Arcs in Desarguesian Planes of Odd Order Do Not Exist." *Combinatorica* 17(1): 31–41.

Barlotti, A. (1955). "Sui $\{k;n\}$-archi di un piano lineare finito." *Bollettino dell'Unione Matematica Italiana* (3) 10: 498–506.

Bichara, A., and Korchmáros, G. (1982). "Note on $(q+2)$-Sets in a Galois Plane of Order $q$." *Annals of Discrete Mathematics* 14: 117–122.

Blokhuis, A., De Boeck, M., Mazzocca, F., and Storme, L. (2014). "The Kakeya Problem: A Gap in the Spectrum and Classification of the Smallest Examples." *Designs, Codes and Cryptography* 72(1): 21–31.

Blokhuis, A., and Mazzocca, F. (2008). "The Finite Field Kakeya Problem." In M. Grötschel and G. O. H. Katona (eds.), *Building Bridges: Between Mathematics and Computer Science*. Bolyai Society Mathematical Studies 19. Berlin: Springer, 205–218.

Cossu, A. (1961). "Su alcune proprietà dei $\{k;n\}$-archi di un piano proiettivo sopra un corpo finito." *Rendiconti di Matematica e delle sue Applicazioni* (5) 20: 271–277.

Denniston, R. H. F. (1969). "Some Maximal Arcs in Finite Projective Planes." *Journal of Combinatorial Theory* 6(3): 317–319.

Dhar, M., Dvir, Z., and Lund, B. (2021). "Simple Proofs for Furstenberg Sets over Finite Fields." *Discrete Analysis* 2021:22.

Dover, J. M., Mellinger, K. E., and Scott, K. E. (2014). "Minimal Kakeya Sets." *Journal of Combinatorial Designs* 22(2): 95–104.

Dvir, Z. (2009). "On the Size of Kakeya Sets in Finite Fields." *Journal of the American Mathematical Society* 22(4): 1093–1097.

Ellenberg, J. S., and Erman, D. (2016). "Furstenberg Sets and Furstenberg Schemes over Finite Fields." *Algebra & Number Theory* 10(7): 1415–1436.

Guth, L. (2016). *Polynomial Methods in Combinatorics*. University Lecture Series 64. Providence, RI: American Mathematical Society.

Hamilton, N., and Mathon, R. (2004). "On the Spectrum of Non-Denniston Maximal Arcs in $PG(2,2^h)$." *European Journal of Combinatorics* 25(3): 415–421.

Hirschfeld, J. W. P. (1998). *Projective Geometries over Finite Fields*, 2nd edn. Oxford: Clarendon Press.

Lidl, R., and Niederreiter, H. (1997). *Finite Fields*, 2nd edn. Encyclopedia of Mathematics and Its Applications 20. Cambridge: Cambridge University Press.

Mathon, R. (2002). "New Maximal Arcs in Desarguesian Planes." *Journal of Combinatorial Theory, Series A* 97(2): 353–368.

Rédei, L. (1970). *Lückenhafte Polynome über endlichen Körpern*. Basel: Birkhäuser. (English translation: *Lacunary Polynomials over Finite Fields*, Amsterdam: North-Holland, 1973.)

Segre, B. (1955). "Ovals in a Finite Projective Plane." *Canadian Journal of Mathematics* 7: 414–416.

Szőnyi, T. (1996). "On the Number of Directions Determined by a Set of Points in an Affine Galois Plane." *Journal of Combinatorial Theory, Series A* 74(1): 141–146.

Thas, J. A. (1974). "Construction of Maximal Arcs and Partial Geometries." *Geometriae Dedicata* 3: 61–64.

Three Lemmas. *The Polynomial Method in Combinatorics, from the Nullstellensatz to Cap Sets.* Companion dissertation by the same author; Chapter 7 treats punctured Kakeya sets.

Wolff, T. (1999). "Recent Work Connected with the Kakeya Problem." In H. Rossi (ed.), *Prospects in Mathematics (Princeton, NJ, 1996)*. Providence, RI: American Mathematical Society, 129–162.
