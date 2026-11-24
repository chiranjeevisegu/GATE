const drills = [
[
"Choose first whether order matters|6 people can fill 2 distinct roles in how many ways?|30. There are 6 choices for the first role and 5 for the second.|nPr = n!/(n−r)!; nCr = nPr/r!|6 choices → 5 remaining → 30 assignments",
"Subtract overlap exactly once|A fair die shows an even number or a number above 3. Find the probability.|The union is {2,4,5,6}, which has four outcomes, so the probability is 4/6 = 2/3.|P(A∪B)=P(A)+P(B)−P(A∩B)|Even {2,4,6} → Above 3 {4,5,6} → Union {2,4,5,6}",
"Compare the joint probability to the product|Can disjoint events with probabilities .2 and .3 be independent?|No. The joint is zero but the product is .06.|P(A∩B)=P(A)P(B) for independence|Disjoint → joint 0 → product .06",
"Restrict the denominator to the given event|Of 30 surveyed people, 12 bike and 5 both bike and run. What fraction of cyclists run?|5/12. Conditioning on cycling reduces the reference group from 30 to 12.|P(A given B)=P(A∩B)/P(B)|30 surveyed → 12 cyclists → 5 also run",
"Expand evidence across all possible sources|Defect rate .1, sensitivity .8, false positive rate .1. Find P(defect given positive).|8/17. True positives contribute .08 and false positives contribute .09 to total positive probability .17.|Posterior = likelihood × prior / evidence|100 items → 8 true positives and 9 false positives → 8/17",
"Use an interval area for continuous probability|For a uniform draw on [0,4], compute P(1≤X≤3).|1/2. The density is 1/4 over an interval of width 2.|F(x)=P(X≤x); P(a<X≤b)=F(b)−F(a)|Density 1/4 → interval width 2 → probability 1/2",
"Use n−1 for the usual unbiased sample variance|Find the unbiased sample variance of 1, 3, 5.|4. The squared deviations from mean 3 are 4, 0, 4. Divide their sum by 2.|s²=Σ(xᵢ−x̄)²/(n−1)|1,3,5 → −2,0,2 → 4,0,4 → 4",
"Check whether either variance is zero before computing correlation|If Y=7−2X and Var(X)>0, what is Corr(X,Y)?|−1. Centering removes 7. The negative slope reverses the direction and its magnitude cancels on standardizing.|Corr(X,Y)=Cov(X,Y)/(σₓσᵧ)|Center → Y deviations = −2 × X deviations → r=−1",
"Check that trials have the same success probability and are independent|Find P(exactly two heads in three fair tosses).|3/8. There are three positions for the tail and each sequence has probability 1/8.|P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ|HHT → HTH → THH",
"Match the distribution to the quantity being modeled|A Poisson process has rate 3/hour. What is the chance of no arrival in 20 minutes?|e⁻¹. The mean number of events in 1/3 hour is 1, so use P(N=0)=exp(−1).|Poisson P(N=k)=e⁻λλᵏ/k!; exponential P(T>t)=e⁻ʳᵗ|3 per hour → 1/3 hour → λ=1 → e⁻¹",
"Degrees of freedom often come from estimated constraints|If Z₁ and Z₂ are independent standard normals, what is the mean of Z₁²+Z₂²?|2. Each squared standard normal has expectation 1. Their sum is chi-squared with two degrees of freedom.|χ²ₖ=ΣZᵢ²; tₖ=Z/√(χ²ₖ/k) with independent inputs|Z₁² mean 1 → Z₂² mean 1 → sum mean 2",
"Separate variation within groups from variation between groups|Equal-sized groups have means 2 and 6 and both have variance 1. Find total variance.|5. Average within-group variance is 1. Between-group means lie 2 units from 4, so their variance is 4.|Var(X)=E[Var(X given Y)]+Var(E[X given Y])|Group means 2 and 6 → overall mean 4 → between 4 + within 1",
"Standard error shrinks at the square-root rate|If σ=12 and n=36, what is the standard error of the iid sample mean?|2. Divide the population standard deviation by √36=6.|SE(X̄)=σ/√n|σ=12 → √n=6 → SE=2",
"Apply the critical value to the standard error|A normal approximation gives estimate 10, SE=2 and critical value 1.96. Find the interval.|[6.08,13.92]. The margin of error is 1.96×2=3.92.|estimate ± critical value × SE|10 → margin 3.92 → [6.08,13.92]",
"Pick the statistic before doing arithmetic|A chi-square goodness-of-fit test observes (8,12) against expected counts (10,10). Find the statistic.|.8. Each cell contributes 4/10 and the two contributions add.|χ²=Σ(O−E)²/E; t=(x̄−μ₀)/(s/√n)|8 vs 10 → .4; 12 vs 10 → .4 → .8"
],
[
"Check zero first when testing a subspace|Is x+y=1 a subspace of ℝ²?|No. Its points exclude (0,0), violating the zero-vector condition.|Span{vᵢ}={Σ cᵢvᵢ}|(0,0) → x+y=0 → fails x+y=1",
"Count pivots to find the number of independent columns|Are (1,2) and (3,6) independent?|No. The second equals three times the first, so the span is one-dimensional.|Independent iff Σcᵢvᵢ=0 forces every cᵢ=0|v=(1,2) → 3v=(3,6) → one direction",
"Check the inner dimensions|A is 3×2 and B is 2×5. What is the shape of AB?|3×5. The shared dimension 2 is summed over in every entry.|(AB)ᵢⱼ=Σₖ AᵢₖBₖⱼ|3×2 → contract 2 → 3×5",
"An orthogonal projector is symmetric and idempotent|Project (4,1) onto span{(1,1)}.|(2.5,2.5). Dot product is 5, squared norm is 2, and multiplying (1,1) by 5/2 gives the projection.|P=uuᵀ/(uᵀu), u≠0; P²=P; QᵀQ=I for orthogonal Q|x=(4,1) → uᵀx=5 → coefficient 2.5 → (2.5,2.5)",
"Symmetrize A before applying an eigenvalue sign test|Is x₁²+4x₂² positive definite?|Yes. Each square is nonnegative, and at least one is positive for every nonzero vector.|xᵀAx=xᵀ[(A+Aᵀ)/2]x|Square x₁ → square x₂ × 4 → sum > 0 for x≠0",
"Check augmented rows for contradictions|Solve x+y=5 and x−y=1.|x=3 and y=2. Add to remove y, then substitute into either equation.|Consistent iff rank(A)=rank([A b])|Two equations → add to get 2x=6 → substitute y=2",
"Rank and nullity sum to the number of columns|A 3×5 matrix has rank 2. Find its nullity.|3. There are 5 columns and 2 pivot variables, leaving 3 free variables.|rank(A)+nullity(A)=number of columns|5 columns → 2 pivots → 3 free variables",
"Use trace and determinant as candidate checks|Find the eigenvalues of a triangular matrix with diagonal (2,−3,7).|2, −3 and 7. Its characteristic polynomial is the product of shifted diagonal entries.|Av=λv; det(A−λI)=0|Triangle → diagonal → 2, −3, 7",
"Elimination multipliers populate L|Eliminate entry 6 below pivot 2. What multiplier goes into L?|3. Subtract three times the pivot row from the lower row.|PA=LU with row pivoting|6 / 2 = 3 → row₂ ← row₂ − 3row₁ → eliminated 0",
"Square singular values to get eigenvalues of AᵀA|For A=diag(−3,2), find the singular values.|3 and 2. AᵀA has eigenvalues 9 and 4, whose nonnegative square roots are 3 and 2.|A=UΣVᵀ; σᵢ=√λᵢ(AᵀA)|−3, 2 → square to 9,4 → roots 3,2"
],
[
"Compare one-sided limits before testing continuity|Does abs(x)/x have a limit at zero?|No. Negative x gives −1 and positive x gives 1, so the sides disagree.|Continuity at a requires limₓ→ₐ f(x)=f(a)|Left −1 → x=0 undefined → right +1",
"Apply the chain rule from outside to inside|Differentiate (3x+1)⁴.|12(3x+1)³. The outer derivative is 4(3x+1)³ and the inner derivative is 3.|(f∘g)′(x)=f′(g(x))g′(x)|Outer power → 4(3x+1)³ → multiply by 3",
"The expansion center determines where the approximation is locally useful|Approximate e^0.1 through the quadratic term.|1.105. The terms are 1, 0.1 and 0.1²/2=.005.|f(a+h)≈Σ f⁽ᵏ⁾(a)hᵏ/k!|1 → +.1 → +.005 → 1.105",
"Test endpoints and nondifferentiable points as well as stationary points|Find the maximum of f(x)=x²−2x on [0,3].|3 at x=3. The candidates x=0,1,3 have values 0,−1,3 respectively.|Interior smooth candidates satisfy f′(x)=0|x=0 gives 0 → x=1 gives −1 → x=3 gives 3"
],
[
"Trace names and objects separately|What does a contain after a=[1]; b=a; b.append(2)?|[1,2]. Both names reference one list, so append changes what both names see.|b=a aliases; b=a[:] makes a shallow list copy|a,b → same [1] → append 2 → shared [1,2]",
"Count total work across all iterations|How much work is Σᵢ₌₁ⁿ i constant-time operations?|Θ(n²). The sum equals n(n+1)/2 and the quadratic term dominates.|Σᵢ₌₁ⁿ i=n(n+1)/2|1 → 2 → … → n → total n(n+1)/2",
"Use a stack for most-recent-first and a queue for arrival order|Push 4, then 8. What is popped from a stack and removed from a queue?|Stack 8, queue 4. The stack removes the newest item and the queue removes the oldest.|Stack LIFO; queue FIFO|Add 4 → add 8 → stack removes 8 / queue removes 4",
"Finding the insertion location may dominate the update|What is the time to insert after a known singly linked node?|Θ(1). Point the new node at the old successor, then link the predecessor to the new node.|new.next = prev.next; prev.next = new|prev → successor; new → successor; prev → new → successor",
"For a full binary tree, count edges two ways|A full binary tree has 7 internal nodes. How many leaves?|8. Each internal node contributes two edges. With L leaves, 14=7+L−1, so L=8.|Full binary tree: leaves = internal nodes + 1|7 internals → 14 edges → 15 total nodes → 8 leaves",
"Use the height to analyze search cost|Insert 1,2,3,4 into an empty ordinary BST. What is its height in edges?|3. Each new value becomes the right child of the previous value.|Search Θ(h+1) in the worst case for height h|1 → right 2 → right 3 → right 4",
"Different keys sharing one bucket still require equality checks|For h(k)=k mod 5, where do 12 and 17 go?|Bucket 2. Both leave remainder 2, so a chaining table keeps both entries in that bucket.|Load factor α=n/m|12 mod 5 = 2 → 17 mod 5 = 2 → same chain",
"Binary search needs a sorted range or a monotone predicate|Find 9 in [1,3,5,7,9] using floor midpoint. Which values are checked?|5,7,9. First move right of 5, then move right of 7, then find 9.|Binary search worst-case Θ(log n)|[1,3,5,7,9] → probe 5 → probe 7 → probe 9",
"Track what becomes final after each pass|What comes after the first left-to-right bubble pass on [3,2,1]?|[2,1,3]. Swap 3 with 2, then 3 with 1. The maximum is now at the end.|Bubble/insertion best Θ(n) with early exit where applicable; selection Θ(n²)|[3,2,1] → [2,3,1] → [2,1,3]",
"Distinguish balanced from one-sided partitions|What is the recurrence of merge sort for powers of two?|T(n)=2T(n/2)+Θ(n). Sort two halves and make one linear merge. The result is Θ(n log n).|Merge Θ(n log n); quicksort expected Θ(n log n), worst Θ(n²)|Split → two sorted halves → linear merge",
"Use the edge count to compare graph representations|What is the sum of degrees for an undirected graph with 9 edges?|18. Each edge contributes one incidence to each end, with a loop counting twice at its vertex.|Σ deg(v)=2E|9 edges → 2 incidences each → 18",
"In BFS, mark vertices when enqueued|S connects to A and B, and A connects to C. What are BFS layers from S?|{S}, {A,B}, {C}. Edges extend the frontier one step at a time.|Adjacency-list BFS and DFS run in Θ(V+E)|Layer 0 S → layer 1 A,B → layer 2 C",
"Check edge signs before choosing Dijkstra|S→T costs 7, S→A costs 2, A→T costs 3. Find shortest cost.|5. Relaxing S first gives T=7 and A=2. Processing A improves T to 2+3=5.|Relax d[v] ← min(d[v],d[u]+w(u,v))|S=0 → A=2,T=7 → A improves T=5"
],
[
"Turn a many-to-many relationship into a linking table|How would you represent many students taking many courses?|Use Enrollment(student_id,course_id), with each ID referencing its parent table and the pair as the key.|Many-to-many → junction table|Student → Enrollment → Course",
"A candidate key must be both unique and minimal|If A alone identifies each row, can (A,B) be a candidate key?|No. It is a superkey, but removing B preserves uniqueness.|Candidate key = minimal superkey|{A,B} unique → remove B → {A} still unique",
"Projection removes duplicates in classical relational algebra|Project Dept from rows (1,CS), (2,CS), (3,EE). What remains?|{CS, EE}. Projection retains the chosen attribute and treats the result as a set.|π picks columns; σ filters rows|3 input rows → Dept only → 2 distinct values",
"Safe queries range over relevant data|Write a tuple-calculus query for students with marks above 80.|{t : Student(t) ∧ t.marks>80}. Student(t) restricts t to actual rows of the relation.|{t : R(t) ∧ condition(t)}|Student row → marks > 80? → retain qualifying row",
"WHERE filters rows and HAVING filters groups|Given scores 4, NULL, 6, what are COUNT(score) and AVG(score)?|2 and 5. These aggregates skip NULL. AVG divides the sum 10 by the count 2.|FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY|4,NULL,6 → keep 4,6 → count 2; average 5",
"Compute closure by repeatedly applying dependencies|For R(A,B,C) with A→B and B→C, find A⁺ and identify a BCNF violation.|A⁺={A,B,C}, so A is a key. B→C violates BCNF because B⁺={B,C} omits A.|BCNF: every nontrivial determinant is a superkey|A → A,B → A,B,C; B → B,C only",
"Range scans benefit from ordered leaf pages|Choose an index for finding all keys between 20 and 40.|A B+ tree. Seek the first eligible key and follow linked leaves until keys exceed 40.|B+ tree supports ordered scans; hash index favors equality|Seek 20 → scan leaves → stop above 40",
"Guard against constant columns and fit transforms on training data|Map 30 to [0,1] using range [10,50].|.5. Subtract 10, then divide by the range 40.|Min–max = (x−min)/(max−min); z=(x−μ)/σ|30 → subtract 10 → 20 → divide by 40 → .5",
"Identify the grain before choosing dimensions|How do you move from state totals to city totals in OLAP?|Drill down along the geography hierarchy, assuming city-level data exists in the cube or its source.|Drill down = more detail; roll up = aggregation|Country → State → City",
"Recompute ratios from the underlying totals|What is the combined success rate for 4/5 and 10/20?|14/25=56%. Add successes and attempts before dividing. The simple average weights the two groups equally.|Combined rate = Σnumerator / Σdenominator|4+10=14 successes → 5+20=25 attempts → 56%"
]
];

drills.push(
[
"Identify the target type before picking the loss|Predict tomorrow’s temperature and whether it rains. Which is regression?|Temperature is regression because it is numerical and continuous. Rain/no rain is classification.|Regression commonly uses squared error; classification can use cross-entropy|Temperature → real-valued target; rain → class label",
"Residuals are orthogonal to fitted feature columns in least squares|Fit a line through (0,1) and (2,5). Find slope and intercept.|Slope 2 and intercept 1. The slope is (5−1)/(2−0), and x=0 gives the intercept.|XᵀXw=Xᵀy; e=y−Xw|Rise 4 → run 2 → slope 2 → intercept 1",
"Usually leave the intercept unpenalized|In a centered one-feature ridge problem with XᵀX=4, Xᵀy=8 and λ=4, find w.|1. Divide 8 by 4+4. Ordinary least squares would give 2.|w=(XᵀX+λI)⁻¹Xᵀy for penalized coefficients|OLS 8/4=2 → add penalty → ridge 8/8=1",
"At threshold .5 the decision boundary occurs at logit zero|Find the predicted probability when the logit is ln 3.|.75. The odds are 3, so p=3/(1+3).|σ(z)=1/(1+e⁻ᶻ); log-odds = ln(p/(1−p))|ln 3 → odds 3:1 → p=.75",
"Scale features when their units distort distances|For query 3 and samples 1:A, 4:B, 8:A, what does 1-NN predict?|B. Distances are 2,1,5 and the unique nearest sample is 4.|Euclidean distance = √Σ(xᵢ−yᵢ)²|1:A distance 2 → 4:B distance 1 → 8:A distance 5",
"Compare unnormalized scores and use logs for long feature vectors|P(A)=.4 and P(x given A)=.5. P(B)=.6 and P(x given B)=.2. Which class wins?|A. The two posterior numerators are .20 and .12. The evidence is shared.|score(c)=P(c)∏ᵢP(xᵢ given c)|A .4×.5=.20 → B .6×.2=.12 → A",
"Shared covariance cancels the quadratic terms in the class comparison|In 1D with equal priors, equal variances and class means 0 and 6, find the boundary.|3. The two Gaussian densities are equal at the midpoint under those assumptions.|δₖ(x)=xᵀΣ⁻¹μₖ−½μₖᵀΣ⁻¹μₖ+ln πₖ|Class A mean 0 → boundary 3 → class B mean 6",
"Margin-plane support vectors satisfy the canonical equality|For decision line x₁=2 and canonical w=(2,0), find the full margin width.|1. The two margin planes are separated by 2/‖w‖=2/2.|Full canonical margin width = 2/‖w‖|x₁=1.5 → boundary x₁=2 → x₁=2.5",
"Weight each child impurity by the fraction of examples it receives|Find the Gini impurity of a node with class counts 3 and 1.|.375. Subtract (.75)²+(.25)² from one.|Gini=1−Σpₖ²; entropy=−Σpₖlog₂pₖ|Counts 3 and 1 → fractions .75 and .25 → impurity .375",
"Compare training and validation performance together|A tree fits training data perfectly but struggles on held-out data. Which change may help?|Limit depth or prune the tree. Simpler trees can reduce variance and improve generalization.|Squared prediction error = bias² + variance + irreducible noise under standard decomposition|Very deep tree → low training error → high validation error → prune",
"Fit preprocessing inside each training fold|There are 120 training examples and 30 held-out test examples. How many LOOCV fits for one candidate?|120. One fit holds out each training example in turn. The test set stays separate.|LOOCV: n fits, n−1 training observations per fit|150 total → 30 test aside → 120 validation rounds",
"Compute affine scores before applying activations|For x=(2,−1), w=(1,3), b=.5, compute ReLU(wᵀx+b).|0. The affine score is 2−3+.5=−.5, and ReLU clips negative values to zero.|a=φ(Wx+b); ReLU(z)=max(0,z)|2−3+.5 → −.5 → ReLU 0",
"Examine how the metric and scaling define similarity|Why might rescaling income alter clusters based on Euclidean distance?|Rescaling changes its contribution to squared distances, which can change nearest clusters and assignments.|Distance is evaluated in the chosen feature representation|Income in rupees → large distances → standardized income → balanced scale",
"Means can lie outside the dataset, and medoids must be observations|For assigned points 1,2,9, find the mean and absolute-distance medoid.|Mean 4. Medoid 2 because its distance sum is 1+7=8, compared with 9 for 1 and 15 for 9.|k-means objective = Σᵢ‖xᵢ−μcluster(i)‖²|1,2,9 → mean 4 → medoid 2",
"Single linkage uses nearest pair and complete linkage uses farthest pair|For clusters {0,2} and {5,8}, find single and complete linkage distances.|3 and 8. The smallest cross-distance is 5−2 and the largest is 8−0.|Single=min pairwise distance; complete=max; average=mean cross-distance|Cross distances 5,8,3,6 → min 3 → max 8",
"Center the features before covariance PCA|Covariance is diag(9,1). Find the first component direction and explained variance fraction.|The first axis, up to sign, explains 9/(9+1)=90%.|Explained variance fraction = λᵢ/Σλⱼ|Eigenvalues 9 and 1 → choose first axis → 90%"
],
[
"Represent enough state to predict legal next steps and costs|A door opens only after you collect a key. Is position alone a sufficient state?|No. Include whether the key is held, because legal actions can differ at the same position.|State model: initial state, actions, transitions, costs, goal test|Same room → key absent or held → different legal moves",
"Use UCS when path costs vary and are nonnegative|A direct edge costs 9. A two-edge path costs 2+3. Which algorithm guarantees the cheaper result here, BFS or UCS?|UCS. It expands by cumulative cost. BFS prefers fewer edges and can select the cost-9 path.|BFS priority = depth; UCS priority = g(n)|Depth 1 path costs 9 → depth 2 path costs 5 → UCS chooses 5",
"Admissibility bounds h by true remaining cost. Consistency checks each edge.|For frontier nodes A(g=3,h=5) and B(g=6,h=1), which does A* expand first?|B. Its f-score is 7, below A’s score of 8.|A*: f(n)=g(n)+h(n); consistency h(u)≤c(u,v)+h(v)|A 3+5=8 → B 6+1=7 → expand B",
"Propagate terminal values from the bottom up|MAX can choose MIN nodes with leaf pairs (2,8) and (4,5). What is the root value?|4. The MIN children evaluate to 2 and 4. MAX chooses 4.|Prune when α≥β|Left MIN 2 → right MIN 4 → MAX 4",
"An implication is false only for true antecedent and false consequent|When is p⇒q false?|Exactly when p is true and q is false. In that row ¬p∨q is false.|p⇒q ≡ ¬p∨q|p=T,q=T → T; p=T,q=F → F; p=F → T",
"Negation swaps quantifiers and negates the predicate|Negate ∀x ∃y R(x,y).|∃x ∀y ¬R(x,y). Push negation through each quantifier in turn.|¬∀x P ≡ ∃x ¬P; ¬∃x P ≡ ∀x ¬P|¬∀x → ∃x ¬∃y → ∃x ∀y ¬R",
"Conditioning blocks a chain and can open a collider|For A→B→C with no other paths, what independence follows given B?|A and C are conditionally independent given B because conditioning on the middle node blocks the only path.|P(A,B,C)=P(A)P(B given A)P(C given B)|A → B observed → C; path blocked",
"Multiply only factors that contain the eliminated variable|For A→B, how do you eliminate A to find P(B)?|Multiply P(A) and P(B given A), then sum over all values of A. The resulting factor is P(B).|P(B)=Σₐ P(A=a)P(B given A=a)|P(A) and P(B given A) → multiply → sum out A",
"Rare evidence can waste most rejection samples|If evidence occurs with probability .02, how many of 1000 rejection samples are retained on average?|20. Each sample independently meets the evidence with probability .02, giving expected count 1000×.02.|Weighted estimate = Σ wᵢ1(queryᵢ) / Σ wᵢ|1000 draws → retain about 2% → about 20"
],
[
"Find the true subject before matching the verb|Choose is or are in “The list of applicants ___ ready.”|Is. “List” is the singular subject. “Of applicants” modifies the subject.|Subject and finite verb agree in number|The list → of applicants → is ready",
"Compute a percent change using the starting value|Price increases 25% and then decreases 20%. What is the net change?|0%. The factors are 1.25 and .80, whose product is 1.|Successive changes multiply: final = initial × ∏(1+rᵢ)|100 → 125 → 100",
"Track an asymmetric feature when mentally rotating a figure|Rotate point (3,1) by 90° counterclockwise about the origin.|(−1,3). The old x-coordinate becomes y, and the negative old y-coordinate becomes x.|90° counterclockwise: (x,y) ↦ (−y,x)|Start (3,1) → rotate left 90° → end (−1,3)"
]
);

const papers = [
 [2026,"IIT Guwahati","2026/QPs/DA.pdf","2026/Keys/DA_Keys.pdf"],
 [2025,"IIT Roorkee","2025/DA2025.pdf","2025_Key/DA_Keys.pdf"],
 [2024,"IISc Bengaluru","2024/DA24S1.pdf","2024/DAFinalAnswerKey.pdf"]
];
const pyqs = [
 [2026,11,8,"PCA directions","B. The covariance matrix is symmetric, so PCA chooses an orthonormal eigenbasis. Component 1 and component 10 therefore have dot product zero and angle 90°."],
 [2026,12,8,"Leave-one-out validation","C. Remove the 100 test samples before model selection. Each of the remaining 900 samples is held out once, giving 900 splits."],
 [2026,13,9,"Informed search","C. A* prioritizes g+h using an estimate of the remaining cost. Breadth-first, depth-first and depth-limited search can choose their order without a heuristic."],
 [2026,14,9,"Predicate logic","C. Saying every king is a person requires an implication. The universally quantified conjunction would require every object in the domain to be a king as well as a person."],
 [2026,15,10,"Expected quicksort recurrence","D. Under the random order assumption the first pivot has each rank with probability 1/n. Average the two recursive costs over the n ranks and add the linear partition cost."],
 [2026,16,11,"Python mutable defaults","B. The empty default list is created once when the function is defined. The first two calls mutate that same list, yielding [1] and then [1,2]. The third call passes a fresh list and yields [3]."],
 [2026,17,12,"Candidate keys and closure","A. D appears on no right-hand side, so every key includes it. Starting with AD, ED or CD produces all five attributes, and removing either attribute from any pair loses that property. BD adds nothing."],
 [2026,18,12,"OLAP drill-down","D. Country to state changes to a finer level of the geographic hierarchy, so this is a drill-down."],
 [2026,19,13,"Counting subsets with even product","C. Choose a nonempty subset of the 1013 even numbers and any subset of the 1013 odd numbers. Divide the product of those counts by 2²⁰²⁶−1, the number of nonempty subsets."],
 [2026,20,13,"Stars and bars","A. The number of nonnegative solutions is C(23,3). For positive solutions, give one unit to each variable and distribute the remaining 16 units, giving C(19,3). Take the ratio under uniform sampling."],
 [2026,21,14,"Rotation matrix powers","B. Five applications rotate by 2π, so M⁵=I. Since 2026 leaves remainder 1 on division by 5, M²⁰²⁶=M."],
 [2026,22,14,"Subspace cross-section","A. The inequality describes a ball of radius 4. Every two-dimensional linear subspace passes through its center, cutting out a radius-4 disk with area 16π."],
 [2025,11,10,"Tower property","C. Average the conditional mean over the values of Y. The resulting total expectation is E[X]."],
 [2025,13,10,"Row sums and a null space","C. The all-ones vector v satisfies Av=v. Thus (A³−2A²+A)v=(1−2+1)v=0. Every scalar multiple of v is a solution."],
 [2025,14,11,"Even derivatives of an odd function","A. Every even derivative of sinh x is sinh x again, which vanishes at zero."],
 [2025,15,11,"Material implication","A. The only false row of both p⇒q and ¬p∨q is p true with q false. The truth tables match."],
 [2025,16,11,"Dependency preservation","C. When a dependency spans decomposed tables and cannot be enforced from their projected dependencies, join the relevant tables to check it."],
 [2024,11,9,"Poisson and normal moments","A. A Poisson random variable has mean and variance λ. A standard normal is defined by mean 0 and variance 1."],
 [2024,12,9,"Mutually exclusive toss events","A. With three tosses, at least two heads and at least two tails together would require at least four tosses. Their intersection is empty."],
 [2024,13,10,"Eigenvalue discriminant","B. The trace is 3 and the determinant is 5. The characteristic polynomial λ²−3λ+5 has discriminant −11, giving a complex conjugate pair."],
 [2024,15,11,"Second derivative test","A. With zero first derivative and positive second derivative, the quadratic term makes nearby function values larger. That establishes a strict local minimum."],
 [2024,16,11,"Stack, queue and hash table","A. Match FIFO to queue, key lookup to hash table and LIFO to stack."]
];
const deeper = [
[
"Use combinations for unordered distinct selections. If repetitions are allowed and order matters, r independent positions with n choices give nʳ strings. For distributing n identical objects among k labeled bins, arrange n stars and k−1 bars to get C(n+k−1,k−1).",
"An outcome is one element of Ω. An event is a set of outcomes. For finite equally likely outcomes use favorable/total. For unequal outcomes add their individual probabilities. The complement satisfies P(Aᶜ)=1−P(A).",
"For three events, pairwise independence tests each pair. Mutual independence also requires the triple product rule. Two fair bits X,Y and their XOR give three pairwise independent bits, but any two determine the third.",
"A conditional density is f(x given y)=f(x,y)/fY(y) where fY(y)>0. Integrate the joint density over x to obtain fY(y), keeping the joint support in your limits. Independence factorizes the joint into its marginals.",
"If hypotheses form a partition, the evidence is Σᵢ P(E given Hᵢ)P(Hᵢ). Posterior odds equal prior odds multiplied by the likelihood ratio. This explains why a rare event can remain unlikely after a positive result.",
"A continuous density may exceed one. The integral over its entire support must be one. In a discrete CDF the jump height at x equals P(X=x). A right-continuous CDF also handles distributions containing both point masses and continuous intervals.",
"Adding a constant shifts the mean and leaves variance unchanged. Scaling by a multiplies variance by a². The median is often more stable than the mean when a single observation is extreme.",
"Use Cov(X,Y)=E[XY]−E[X]E[Y]. Independence gives zero covariance when moments exist. The converse fails: take X uniform on {−1,0,1}, Y=X². Symmetry gives zero covariance even though Y is determined by X.",
"A Bernoulli variable takes values 1 and 0 with mean p and variance p(1−p). The sum of n independent Bernoulli(p) variables is binomial. Sampling without replacement from a finite population usually breaks the independence assumption.",
"For Uniform(a,b), mean=(a+b)/2 and variance=(b−a)²/12. For Exponential(r), mean=1/r and variance=1/r². For Normal(μ,σ²), standardize with Z=(X−μ)/σ before looking up a tail probability.",
"The t distribution has heavier tails than a standard normal and approaches it as degrees of freedom grow. A chi-squared distribution is nonnegative and asymmetric. If independent chi-squared variables are added, their degrees of freedom add.",
"The tower rule E[E[X given Y]]=E[X] averages the group means with population weights. Conditional variance describes spread remaining after observing Y. The between-group term in total variance measures how much the group means vary.",
"For iid observations with finite positive variance, (X̄−μ)/(σ/√n) converges in distribution to a standard normal. The sample mean becomes approximately normal even when the original observations are skewed, with the accuracy depending on the distribution and n.",
"For a normal population with unknown variance, a two-sided mean interval uses t with n−1 degrees of freedom. A 95% frequentist procedure covers the fixed parameter in 95% of repeated samples under its assumptions.",
"A p-value is a tail probability under the null model. A z statistic uses known σ or an appropriate large-sample approximation. A one-sample t statistic uses s and n−1 degrees of freedom under normal sampling. For fitted categorical goodness-of-fit tests, subtract the number of fitted parameters from the usual k−1 degrees of freedom."
],
[
"To check closure efficiently, test au+bv for arbitrary real a,b and vectors u,v in the set. A homogeneous solution set Ax=0 is always a subspace. An affine translate may satisfy vector addition only when it contains the origin.",
"To recover a column-space basis, select the pivot columns from the original matrix after finding their indices by row reduction. To recover a null-space basis, solve the homogeneous system with one free variable set to one at a time.",
"The identity leaves vectors unchanged and an invertible matrix has a unique inverse. A square matrix is symmetric if Aᵀ=A. Transposition reverses products: (AB)ᵀ=BᵀAᵀ. Inverses reverse product order as well.",
"Every projection satisfies P²=P, and symmetry makes the projection orthogonal. For full-column-rank A, projection onto its columns is A(AᵀA)⁻¹Aᵀ. Block matrix multiplication follows the same row-by-column rule when block sizes match.",
"For real symmetric A, diagonalize A=QΛQᵀ and substitute y=Qᵀx. Then the form becomes Σ λᵢyᵢ². All positive eigenvalues give positive definite, nonnegative eigenvalues give positive semidefinite, and mixed signs give indefinite.",
"For a consistent m×n system, choose one particular solution x₀. Every solution is x₀+z with z in the null space. There is a unique solution precisely when the null space is trivial.",
"A row swap changes determinant sign. Multiplying a row by c multiplies determinant by c. Adding a multiple of one row to another preserves determinant. For a triangular matrix, multiply diagonal entries.",
"A symmetric real matrix has real eigenvalues and an orthonormal eigenbasis. A repeated eigenvalue can have fewer independent eigenvectors than its multiplicity for a general matrix. Powers share an eigenvector with A and raise its eigenvalue to the corresponding power.",
"After obtaining PA=LU, solve Ax=b by forward substitution in Ly=Pb followed by back substitution in Ux=y. Pivoting can prevent division by zero and improve numerical stability.",
"For an m×n matrix, the full SVD uses square orthogonal U and V with a rectangular diagonal Σ. The number of positive singular values is the rank. Keeping the k largest gives a best rank-k approximation in Frobenius norm."
],
[
"For a piecewise function, evaluate the left limit and right limit first. If they agree, compare their shared value with f(a). A removable discontinuity can be fixed by redefining only the point value.",
"Differentiability implies continuity. The reverse fails for |x| at zero. Use the product rule (uv)′=u′v+uv′ and quotient rule (u/v)′=(u′v−uv′)/v² where the denominator is nonzero.",
"For a degree-n Taylor polynomial, under the usual differentiability conditions the Lagrange remainder is f⁽ⁿ⁺¹⁾(ξ)(x−a)ⁿ⁺¹/(n+1)! for ξ between x and a. Bound the derivative on that interval to bound the error.",
"If f′ changes from negative to positive at a stationary point, it is a local minimum. If f″=0 there, the second derivative test is inconclusive. A global optimum on a closed bounded interval can be found by comparing all candidate values when f is continuous."
],
[
"Lists, sets and dictionaries are mutable. Integers, strings and tuples are immutable, though a tuple may contain a mutable object. range(start,stop,step) excludes stop. A recursive function needs a base case and progress toward it.",
"O gives an asymptotic upper bound, Ω a lower bound, and Θ a tight bound. Specify best, worst, expected or amortized cost. Repeated doubling of an index produces logarithmically many loop iterations.",
"Use the end of a Python list for stack push/pop. Use collections.deque for queue append and popleft. Removing the front of a list shifts remaining elements and costs linear time.",
"A doubly linked node stores predecessor and successor pointers. That allows constant-time removal of a known node with access to the list boundaries. A singly linked list often needs its predecessor to perform the same deletion.",
"Preorder visits root-left-right, inorder left-root-right, and postorder left-right-root. Level order uses a queue. In a complete tree, levels fill from left to right and height is Θ(log n).",
"Inorder traversal lists BST keys in sorted order. To delete a node with two children, replace it with the smallest key in its right subtree or largest in its left, then delete that replacement from its old location.",
"Separate chaining keeps a collection in each bucket. Open addressing probes alternate slots and needs a strategy for deletions, such as tombstones. A poor hash can place all keys together and produce linear worst-case lookup.",
"Maintain an invariant that any answer lies in the current interval. To find a lower bound, shrink toward the first index whose value is at least the target. Treat the end index as a valid insertion position when all entries are smaller.",
"Insertion sort is stable if it only moves entries strictly greater than the key. Bubble sort is stable if equal neighbors are never swapped. Ordinary selection sort can move equal keys out of relative order with a long-distance swap.",
"Merge sort preserves equal-key order when ties are taken from the left first. Quicksort partitions around a pivot and recurses on the resulting ranges. A bad pivot sequence yields the recurrence T(n)=T(n−1)+Θ(n).",
"An adjacency matrix uses Θ(V²) cells and gives constant-time edge membership. Adjacency lists use Θ(V+E) storage and support neighbor iteration proportional to the vertex degree. A directed edge contributes to one in-degree and one out-degree.",
"DFS uses recursion or an explicit stack and can classify edges and detect cycles. BFS finds shortest paths by edge count in unweighted graphs. In disconnected graphs, restart from each remaining undiscovered vertex to traverse the full graph.",
"Dijkstra finalizes the smallest tentative distance with nonnegative weights. Bellman–Ford repeatedly relaxes all edges and can expose a reachable negative cycle on an extra pass. BFS suffices for unit-weight edges."
],
[
"Entities become tables and attributes become columns. A one-to-many association can place a foreign key on the many side. A weak entity can use the owner’s key together with a partial key.",
"A primary key uniquely identifies rows and cannot contain NULL. A foreign key references a candidate key exposed through an appropriate uniqueness constraint. A nullable foreign-key field can represent an optional relationship.",
"Union and difference need union-compatible relations. A join combines tuples satisfying a predicate. A natural join matches all shared attribute names, so rename unintended shared attributes before joining.",
"Tuple calculus specifies which tuples satisfy a predicate. Existential quantification can express the existence of a matching row. To express every desired item matched, check that there exists no desired item without a match.",
"An inner join keeps matched pairs. A left join also keeps unmatched left rows with NULLs on the right. A WHERE predicate on the right can remove those NULL-extended rows. COUNT(*) counts rows, including rows containing NULL.",
"2NF removes partial dependencies of non-prime attributes on candidate keys. 3NF permits a nontrivial dependency when its determinant is a superkey or its dependent attribute is prime. Check lossless join and dependency preservation separately when decomposing.",
"Heap files favor simple inserts. Sorted organization helps ordered access at the cost of maintenance. A clustered index organizes data with nearby key values physically close, while a secondary index can lead to scattered row fetches.",
"Nominal categories have no inherent order, while ordinal categories do. Equal-width bins divide the value range and equal-frequency bins target similar counts. Stratified sampling preserves representation across groups. Lossless compression can reconstruct the exact original values.",
"A star schema places descriptive dimensions around a central fact table. A snowflake schema splits dimensions into related tables. Slicing fixes one dimension to a value, while dicing selects a subcube across multiple dimensions.",
"Additive measures such as revenue can be summed across dimensions. Semi-additive measures such as account balance can be summed across accounts but often not across time. Nonadditive measures such as rates typically require base totals."
],
[
"Supervised training uses labeled pairs (x,y). A loss scores prediction error, and training minimizes an objective over the available data. Evaluate regression and classification with metrics suited to their targets and error costs.",
"With an intercept, simple OLS gives slope Cov(x,y)/Var(x) and intercept ȳ−w x̄. For multiple regression, correlated columns can make coefficients unstable. If XᵀX is singular, a pseudoinverse provides a minimum-norm least-squares solution.",
"An ℓ₂ penalty improves conditioning because λ shifts the eigenvalues of XᵀX upward for λ>0. Ridge shrinks parameters, and feature scaling affects how much relative shrinkage each coefficient receives.",
"Binary logistic regression fits a linear log-odds function with a nonlinear sigmoid probability. Its standard objective is binary cross-entropy. Changing the decision threshold can change precision and recall without changing the learned probabilities.",
"Small k can create high-variance boundaries and large k smooths predictions. Classification typically votes among neighbors. Regression can average their targets. Set a tie rule when equal distances or vote totals occur.",
"Feature independence is conditional on the class. Under categorical modeling, additive smoothing gives unseen outcomes nonzero probability. Gaussian Naive Bayes models each continuous feature with a class-specific mean and variance.",
"Linear discriminant analysis also finds axes that separate classes relative to within-class spread. With k classes, at most k−1 independent discriminant directions are available. Covariance differences between classes can produce quadratic boundaries instead.",
"Hard-margin classification minimizes ½‖w‖² subject to yᵢ(wᵀxᵢ+b)≥1. Soft margin allows slack and penalizes violations via C. Kernels evaluate similarity in an implicit feature space.",
"Greedy tree growth picks the split with best local impurity improvement. A tree can memorize training samples if unrestricted. Depth limits, minimum leaf sizes and pruning can improve generalization.",
"Bias measures systematic error of the average predictor, and variance measures sensitivity to the sampled training set. A model may show high training and validation error from underfitting. More flexible models can reduce bias while raising variance.",
"Each k-fold round trains on k−1 folds and validates on the remaining fold. Use stratification if preserving class proportions matters. Grouped and time-ordered data require splits that respect groups or temporal order.",
"Compose layers as a⁽ˡ⁾=φ(W⁽ˡ⁾a⁽ˡ⁻¹⁾+b⁽ˡ⁾). Without nonlinear activations, successive affine layers collapse into one affine map. A dense layer with d inputs and k units has dk+k trainable parameters.",
"Without labels, clustering seeks a useful grouping under a chosen representation and criterion. Validate against the goal of the analysis and the geometry of the data. A compactness score can favor a different partition from a connectivity criterion.",
"Lloyd’s k-means alternates nearest-centroid assignment and centroid recomputation; both steps weakly reduce the objective. It can reach different local optima from different initializations. Medoids use observed representatives and can work with non-Euclidean dissimilarities.",
"Agglomerative clustering starts with singletons and merges clusters. Divisive clustering starts with one cluster and splits. A dendrogram records merge levels. Single linkage can chain clusters through a series of close pairs.",
"For centered matrix X, the principal directions are the right singular vectors of X. Covariance eigenvalues are σᵢ²/(n−1) for sample covariance. A rank-k reconstruction projects onto the top k directions and adds the feature means back."
],
[
"Distinguish a state from a search node. Multiple nodes can represent the same state via different paths and costs. Duplicate detection can prevent cycles and redundant exploration.",
"BFS expands shallow nodes first and is optimal for equal step costs under the usual finite branching conditions. Depth-first uses less frontier memory but may follow a long or infinite path. UCS expands the cheapest path so far and requires appropriate positive-cost conditions for completeness in infinite spaces.",
"An admissible heuristic never overestimates remaining optimal cost. A consistent heuristic obeys a triangle inequality on edges. Consistency ensures nondecreasing f along paths and simplifies graph search with a closed set.",
"Alpha tracks the best lower bound already secured by MAX. Beta tracks the best upper bound already secured by MIN. Good move ordering exposes cutoffs early. Pruning changes work but preserves the minimax value.",
"A formula is satisfiable if at least one assignment makes it true and valid if every assignment makes it true. KB entails φ when every satisfying assignment of KB also satisfies φ. De Morgan’s laws swap conjunction and disjunction under negation.",
"Translate “all A are B” as ∀x(A(x)⇒B(x)) and “some A are B” as ∃x(A(x)∧B(x)). Changing the order of ∀ and ∃ can change whether one witness must work for everyone.",
"A Bayes net multiplies one factor per node conditional on its parents. Conditioning on the middle node blocks a chain or fork. A collider blocks its path unless the collider or a descendant is observed.",
"First restrict factors to the observed evidence. Eliminate hidden variables by multiplying relevant factors and summing out that variable. Multiply remaining factors and normalize for the query distribution. The elimination order controls intermediate factor sizes.",
"Prior sampling follows a topological order. Rejection sampling keeps samples consistent with evidence. Likelihood weighting fixes evidence variables and multiplies their conditional probabilities into the weight. Normalize by the sum of weights."
],
[
"Use tense cues and article choice to narrow grammar options. In comprehension, identify what the passage establishes through stated evidence. For paragraph ordering, match pronouns and transitions to the ideas they refer to.",
"Convert units before comparing rates. In a pie chart, angle contributes its share of 360°. A weighted average uses frequencies as weights. For growth, multiplying successive factors correctly accounts for changing bases.",
"Deduction tests whether premises force a conclusion. Induction generalizes from examples and may admit exceptions. In spatial problems, translation and rotation preserve orientation of a labeled shape, whereas a mirror reflection reverses handedness."
]
];
