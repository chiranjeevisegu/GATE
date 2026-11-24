const groups = [
  {
    "title": "Probability & Statistics",
    "lessons": [
      {
        "id": "counting-permutations-and-combinations",
        "title": "Counting: permutations and combinations",
        "intro": "Permutation counts ordered arrangements: nPr = n!/(n−r)!. Combination counts selections where order does not matter: nCr = n!/[r!(n−r)!]. Learn repetition, restrictions, complementary counting and choosing cases without double-counting.",
        "tags": [
          "order",
          "factorial",
          "nPr",
          "nCr"
        ],
        "example": "Picking two of five students gives 10 pairs. Naming a captain and vice-captain gives 20 assignments because swapping roles changes the outcome.",
        "links": [
          [
            "Khan Academy: counting",
            "https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations"
          ],
          [
            "NPTEL probability",
            "https://nptel.ac.in/courses/111/105/111105090"
          ]
        ]
      },
      {
        "id": "probability-axioms-sample-space-and-events",
        "title": "Probability axioms, sample space and events",
        "intro": "Define the sample space Ω and events as subsets of Ω. Probability is non-negative, P(Ω)=1, and additive for mutually exclusive events. Use complements, unions and intersections; P(A∪B)=P(A)+P(B)−P(A∩B).",
        "tags": [
          "sample space",
          "complement",
          "union",
          "intersection"
        ],
        "example": "For a fair die, let A be rolling an even number and B be rolling above 4. The roll 6 belongs to both, so count it only once in A∪B = {2,4,5,6}.",
        "links": [
          [
            "Khan Academy: probability",
            "https://www.khanacademy.org/math/statistics-probability/probability-library"
          ]
        ]
      },
      {
        "id": "independent-and-mutually-exclusive-events",
        "title": "Independent and mutually exclusive events",
        "intro": "Independent: P(A∩B)=P(A)P(B); knowing A does not change the probability of B. Mutually exclusive: A∩B=∅. Non-zero mutually exclusive events are not independent. This distinction is a common conceptual trap.",
        "tags": [
          "independence",
          "disjoint",
          "product rule"
        ],
        "example": "Heads on two separate fair tosses can occur together and have joint probability 1/4. Heads and tails on a single toss are disjoint and have joint probability 0.",
        "links": [
          [
            "Probability lessons",
            "https://www.khanacademy.org/math/statistics-probability/probability-library"
          ]
        ]
      },
      {
        "id": "joint-marginal-and-conditional-probability",
        "title": "Joint, marginal and conditional probability",
        "intro": "Joint probability describes two events together. Marginal probability sums/integrates over the other variable. Conditional probability P(A|B)=P(A∩B)/P(B). For a joint table or density, practise extracting marginals and checking independence.",
        "tags": [
          "joint table",
          "marginalise",
          "conditional denominator"
        ],
        "example": "If 6 of 20 students both code and play chess, their joint fraction is 6/20. If 8 play chess, the fraction who code among chess players is 6/8.",
        "links": [
          [
            "Khan Academy statistics",
            "https://www.khanacademy.org/math/statistics-probability"
          ]
        ]
      },
      {
        "id": "bayes-theorem",
        "title": "Bayes' theorem",
        "intro": "Reverse a conditional probability: P(A|B)=P(B|A)P(A)/P(B). Expand P(B) using total probability. Identify prior, likelihood, evidence and posterior before substituting values.",
        "tags": [
          "prior",
          "likelihood",
          "evidence",
          "posterior",
          "total probability"
        ],
        "example": "Out of 100 items, 10 are defective. A check flags 8 defective and 9 good items. Given a flag, the probability of a defect is 8/(8+9), about 47%.",
        "links": [
          [
            "Seeing Theory: Bayesian inference",
            "https://seeing-theory.brown.edu/bayesian-inference/index.html"
          ]
        ]
      },
      {
        "id": "random-variables-pmf-pdf-and-cdf",
        "title": "Random variables, PMF, PDF and CDF",
        "intro": "A random variable maps outcomes to numbers. PMF is for discrete variables; PDF is for continuous variables and probabilities are areas over intervals. CDF F(x)=P(X≤x) works for both. Practise deriving CDF from PMF/PDF and finding interval probabilities.",
        "tags": [
          "discrete mass",
          "continuous density",
          "cumulative",
          "F(x)"
        ],
        "example": "For a fair die, P(X=3)=1/6 and F(3)=3/6 because F(3) includes 1, 2 and 3. For a continuous distribution, interval probability is area under the density.",
        "links": [
          [
            "ProbabilityCourse",
            "https://www.probabilitycourse.com/"
          ]
        ]
      },
      {
        "id": "mean-median-mode-variance-and-standard-deviation",
        "title": "Mean, median, mode, variance and standard deviation",
        "intro": "Expected value is the probability-weighted average. Variance E[(X−μ)²]=E[X²]−μ² measures spread; standard deviation is its square root. Know linear transformations, scaling, and how outliers affect mean versus median.",
        "tags": [
          "mean",
          "median",
          "mode",
          "variance",
          "standard deviation"
        ],
        "example": "For 1, 2, 2, 9, the mean is 3.5, the median is 2, and the mode is 2. Adding 10 to every value shifts all three by 10 and leaves the variance unchanged.",
        "links": [
          [
            "Statistics fundamentals",
            "https://www.khanacademy.org/math/statistics-probability"
          ]
        ]
      },
      {
        "id": "covariance-and-correlation",
        "title": "Covariance and correlation",
        "intro": "Covariance measures joint variation; correlation standardises it to [−1,1]. Zero correlation does not generally imply independence. Compute from data and interpret sign, magnitude and limitations.",
        "tags": [
          "covariance",
          "Pearson correlation",
          "linear relationship"
        ],
        "example": "If Y=3X+10 and X varies, the correlation is +1. Multiplying X by 3 changes the covariance but the scaling cancels out in correlation.",
        "links": [
          [
            "Correlation lessons",
            "https://www.khanacademy.org/math/statistics-probability/describing-relationships-quantitative-data"
          ]
        ]
      },
      {
        "id": "discrete-distributions-uniform-bernoulli-and-binomial",
        "title": "Discrete distributions: uniform, Bernoulli and binomial",
        "intro": "Bernoulli has one success/failure trial. Binomial counts successes in n independent identical Bernoulli trials. Discrete uniform assigns equal probability to each allowed value. Memorise PMF, mean and variance and identify assumptions.",
        "tags": [
          "Bernoulli",
          "binomial",
          "discrete uniform",
          "independent trials"
        ],
        "example": "Exactly two heads in three fair tosses has probability 3/8. There are three possible positions for the tail, each giving a sequence of probability 1/8.",
        "links": [
          [
            "PMF and distributions",
            "https://www.probabilitycourse.com/chapter3/3_1_1_pmf.php"
          ]
        ]
      },
      {
        "id": "poisson-counts-and-continuous-distributions",
        "title": "Poisson counts and continuous distributions",
        "intro": "Poisson is a discrete model for the number of events in an interval. In a Poisson process, the continuous exponential distribution models the time between arrivals. A continuous uniform distribution has constant density on its interval. A normal distribution is bell-shaped, and Z=(X−μ)/σ converts a value to standard deviation units.",
        "tags": [
          "Poisson count",
          "exponential waiting time",
          "standard normal",
          "uniform density"
        ],
        "example": "At a constant Poisson rate of 2 arrivals per minute, the probability of zero arrivals in a minute is e⁻². The waiting time to the next arrival is exponential with mean 1/2 minute.",
        "links": [
          [
            "Seeing Theory visual modules",
            "https://seeing-theory.brown.edu/"
          ],
          [
            "ProbabilityCourse",
            "https://www.probabilitycourse.com/"
          ]
        ]
      },
      {
        "id": "student-s-t-and-chi-squared-distributions",
        "title": "Student's t and chi-squared distributions",
        "intro": "t-distribution is used for inference about a mean when population variance is unknown, especially with small samples under normality. Chi-squared distributions appear in variance inference and categorical goodness-of-fit/independence tests. Know degrees of freedom.",
        "tags": [
          "degrees of freedom",
          "t statistic",
          "chi-square"
        ],
        "example": "For a one-sample t-test on 10 independent observations from a normal population, estimate spread with the sample standard deviation and use 9 degrees of freedom.",
        "links": [
          [
            "NIST statistical handbook",
            "https://www.itl.nist.gov/div898/handbook/"
          ]
        ]
      },
      {
        "id": "conditional-expectation-and-conditional-variance",
        "title": "Conditional expectation and conditional variance",
        "intro": "E[X|Y] is the expected value of X after observing Y; it is a function of Y. Use the law of total expectation and total variance. For discrete cases, condition by normalising the relevant joint probabilities.",
        "tags": [
          "tower property",
          "total variance",
          "weighted average"
        ],
        "example": "If equally likely groups have means 4 and 10, the overall mean is 7. Even if each group has zero internal variance, the population still varies because the group means differ.",
        "links": [
          [
            "ProbabilityCourse",
            "https://www.probabilitycourse.com/"
          ]
        ]
      },
      {
        "id": "central-limit-theorem-clt",
        "title": "Central Limit Theorem (CLT)",
        "intro": "Under suitable independence and finite-variance conditions, the standardised sample mean approaches a normal distribution as sample size grows. Distinguish the distribution of individual observations from the sampling distribution of the mean.",
        "tags": [
          "sampling distribution",
          "standard error",
          "CLT"
        ],
        "example": "For independent draws with population standard deviation 12, the mean of 36 draws has standard error 12/√36 = 2. The CLT describes the approximate shape of that mean across repeated samples.",
        "links": [
          [
            "Sampling distributions",
            "https://www.khanacademy.org/math/statistics-probability/sampling-distributions-library"
          ]
        ]
      },
      {
        "id": "confidence-intervals",
        "title": "Confidence intervals",
        "intro": "A confidence procedure produces intervals that cover the fixed population parameter at the stated long-run rate. Interpret 95% confidence correctly; it is not a 95% probability that this already-computed interval contains a fixed parameter.",
        "tags": [
          "confidence level",
          "margin of error",
          "standard error"
        ],
        "example": "An estimate of 50 with margin of error 4 gives [46,54]. With a 95% procedure, about 95% of intervals formed from repeated samples cover the fixed parameter under the model assumptions.",
        "links": [
          [
            "NIST handbook",
            "https://www.itl.nist.gov/div898/handbook/"
          ]
        ]
      },
      {
        "id": "hypothesis-testing-z-test-t-test-and-chi-squared-test",
        "title": "Hypothesis testing: z-test, t-test and chi-squared test",
        "intro": "Set H₀ and H₁, choose a statistic and significance level, calculate p-value or compare with a critical value, then state the decision in context. Know assumptions, one/two-sided tests, Type I/II errors and degrees of freedom.",
        "tags": [
          "null hypothesis",
          "p-value",
          "significance level",
          "Type I and II errors"
        ],
        "example": "With p=0.03 and α=0.05, reject the null. A Type I error is rejecting a true null. A Type II error is failing to reject a false null.",
        "links": [
          [
            "Khan Academy: significance tests",
            "https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample"
          ],
          [
            "NIST",
            "https://www.itl.nist.gov/div898/handbook/"
          ]
        ]
      }
    ]
  },
  {
    "title": "Linear Algebra",
    "lessons": [
      {
        "id": "vectors-vector-spaces-and-subspaces",
        "title": "Vectors, vector spaces and subspaces",
        "intro": "A vector space supports vector addition and scalar multiplication. A subspace contains zero and is closed under both operations. Practise span, basis, dimension and checking subspace conditions.",
        "tags": [
          "zero vector",
          "closure",
          "span",
          "subspace"
        ],
        "example": "The line y=2x passes through the origin and is closed under addition and scaling, so it is a subspace of ℝ². The line y=2x+1 fails the zero-vector check.",
        "links": [
          [
            "3Blue1Brown: Essence of Linear Algebra",
            "https://www.3blue1brown.com/topics/linear-algebra"
          ],
          [
            "MIT 18.06",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      },
      {
        "id": "linear-dependence-independence-basis-and-dimension",
        "title": "Linear dependence, independence, basis and dimension",
        "intro": "Vectors are independent if only the trivial linear combination gives zero. A basis is an independent spanning set. The number of basis vectors is dimension. Connect these ideas to rank and nullity.",
        "tags": [
          "linear combination",
          "span",
          "basis",
          "dimension"
        ],
        "example": "The vectors (1,0), (0,1), and (1,1) are dependent because the third is their sum. The first two form a basis of ℝ², so its dimension is 2.",
        "links": [
          [
            "MIT Linear Algebra",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      },
      {
        "id": "matrices-and-matrix-properties",
        "title": "Matrices and matrix properties",
        "intro": "Know matrix addition, multiplication, transpose, inverse, identity and symmetric matrices. Matrix multiplication is generally non-commutative. Check dimensions before multiplying and practise interpreting matrix transformations.",
        "tags": [
          "transpose",
          "symmetry",
          "multiplication",
          "inverse"
        ],
        "example": "For A of shape 2×3 and B of shape 3×4, AB has shape 2×4. The inner dimensions must match, so BA is undefined in this example.",
        "links": [
          [
            "Visual linear algebra",
            "https://www.3blue1brown.com/topics/linear-algebra"
          ]
        ]
      },
      {
        "id": "special-matrices-projection-orthogonal-idempotent-and-partition",
        "title": "Special matrices: projection, orthogonal, idempotent and partition",
        "intro": "Projection matrices map vectors onto a subspace; orthogonal matrices preserve lengths and angles (QᵀQ=I); idempotent matrices satisfy P²=P; partition matrices and their properties. Know defining properties and consequences.",
        "tags": [
          "projection",
          "QᵀQ",
          "idempotence",
          "blocks"
        ],
        "example": "P=diag(1,0) sends (3,4) to (3,0). Applying P twice gives the same result as applying it once, so P²=P.",
        "links": [
          [
            "MIT matrix lectures",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      },
      {
        "id": "quadratic-forms",
        "title": "Quadratic forms",
        "intro": "A quadratic form is xᵀAx, usually with A symmetric. Its sign and definiteness relate to eigenvalues: positive definite matrices have all positive eigenvalues. Practise evaluating forms and recognising positive/negative/semidefinite cases.",
        "tags": [
          "xᵀAx",
          "eigenvalue signs",
          "positive definite"
        ],
        "example": "For A=diag(2,−1), xᵀAx=2x₁²−x₂². It is positive at (1,0) and negative at (0,1), so the form is indefinite.",
        "links": [
          [
            "MIT linear algebra notes",
            "https://math.mit.edu/~gs/linearalgebra/"
          ]
        ]
      },
      {
        "id": "systems-of-linear-equations-and-gaussian-elimination",
        "title": "Systems of linear equations and Gaussian elimination",
        "intro": "Represent equations as Ax=b and use row operations to reach echelon form. Determine consistency, unique/infinite/no solutions, pivot variables and free variables. Track row swaps and arithmetic carefully.",
        "tags": [
          "augmented matrix",
          "pivot",
          "free variable",
          "consistency"
        ],
        "example": "Subtract x+y=3 from 2x+y=5 to get x=2, then y=1. In row reduction, a row saying 0=1 signals an inconsistent system.",
        "links": [
          [
            "Linear systems visualisation",
            "https://www.3blue1brown.com/topics/linear-algebra"
          ]
        ]
      },
      {
        "id": "determinant-rank-and-nullity",
        "title": "Determinant, rank and nullity",
        "intro": "Determinant indicates invertibility for square matrices. Rank is the dimension of the column/row space; nullity is the dimension of the null space. Rank-nullity: rank(A)+nullity(A)=number of columns.",
        "tags": [
          "singular",
          "pivots",
          "null space",
          "rank–nullity"
        ],
        "example": "The matrix with rows (1,2) and (2,4) has one independent row. Its rank is 1, its determinant is 0, and its nullity is 2−1=1.",
        "links": [
          [
            "MIT lectures",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      },
      {
        "id": "eigenvalues-and-eigenvectors",
        "title": "Eigenvalues and eigenvectors",
        "intro": "Av=λv: a nonzero direction v is scaled by λ under A. Find eigenvalues from det(A−λI)=0 and eigenvectors from (A−λI)v=0. Learn trace/determinant relations and diagonalisation conditions.",
        "tags": [
          "Av=λv",
          "characteristic equation",
          "eigenspace"
        ],
        "example": "For A=diag(3,1), A(1,0)=3(1,0). This vector keeps its direction under A, with eigenvalue 3.",
        "links": [
          [
            "Eigenvectors visual intuition",
            "https://www.3blue1brown.com/topics/linear-algebra"
          ],
          [
            "MIT",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      },
      {
        "id": "lu-decomposition",
        "title": "LU decomposition",
        "intro": "Factor a matrix into lower- and upper-triangular factors, A=LU (sometimes with a permutation matrix). Use forward and backward substitution to solve systems efficiently, especially when solving for multiple right-hand sides.",
        "tags": [
          "lower triangular",
          "upper triangular",
          "forward substitution",
          "pivoting"
        ],
        "example": "Eliminate the 2 below the first pivot in rows (1,1) and (2,3) by subtracting twice row 1. Record the multiplier 2 in L and the resulting rows (1,1), (0,1) in U.",
        "links": [
          [
            "MIT: elimination and LU",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      },
      {
        "id": "singular-value-decomposition-svd",
        "title": "Singular Value Decomposition (SVD)",
        "intro": "Any real matrix A can be decomposed as UΣVᵀ. Singular values are non-negative square roots of eigenvalues of AᵀA. Understand rank, low-rank approximation, geometric meaning and the connection to PCA.",
        "tags": [
          "UΣVᵀ",
          "singular values",
          "AᵀA",
          "low rank"
        ],
        "example": "For A=diag(3,−2), AᵀA=diag(9,4). Take square roots to get singular values 3 and 2.",
        "links": [
          [
            "SVD visual lessons",
            "https://www.3blue1brown.com/topics/linear-algebra"
          ],
          [
            "MIT 18.06",
            "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          ]
        ]
      }
    ]
  },
  {
    "title": "Calculus & Optimization",
    "lessons": [
      {
        "id": "functions-of-one-variable-limits-and-continuity",
        "title": "Functions of one variable, limits and continuity",
        "intro": "Study domain, range, composition and graphs. A limit describes the value approached near a point. Continuity at a point requires the function value, limit and existence to agree. Practise one-sided limits and standard limits.",
        "tags": [
          "one-sided limits",
          "continuity",
          "removable discontinuity"
        ],
        "example": "For x≠1, (x²−1)/(x−1)=x+1. Its limit at 1 is 2, so defining the function value as 2 fills the hole continuously.",
        "links": [
          [
            "Khan Academy: limits",
            "https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new"
          ]
        ]
      },
      {
        "id": "differentiability-and-derivative-rules",
        "title": "Differentiability and derivative rules",
        "intro": "The derivative is the instantaneous rate of change/slope. Master power, product, quotient and chain rules; derivatives of exponential, logarithmic and trigonometric functions. Differentiability implies continuity, but not conversely.",
        "tags": [
          "slope",
          "product rule",
          "quotient rule",
          "chain rule"
        ],
        "example": "For f(x)=(x²+1)³, the outer derivative is 3(x²+1)² and the inner derivative is 2x. Multiply them to get 6x(x²+1)².",
        "links": [
          [
            "Differential calculus",
            "https://www.khanacademy.org/math/differential-calculus"
          ]
        ]
      },
      {
        "id": "taylor-series-and-approximation",
        "title": "Taylor series and approximation",
        "intro": "Approximate a smooth function near a point using its derivatives: f(x)≈f(a)+f′(a)(x−a)+f″(a)(x−a)²/2!+…. Know common expansions and how truncation order affects approximation.",
        "tags": [
          "expansion point",
          "Maclaurin",
          "derivatives",
          "remainder"
        ],
        "example": "Near x=0, eˣ≈1+x+x²/2. At x=0.1 this gives 1.105, close to 1.10517.",
        "links": [
          [
            "Paul's Online Notes: Taylor series",
            "https://tutorial.math.lamar.edu/Classes/CalcII/TaylorSeries.aspx"
          ]
        ]
      },
      {
        "id": "maxima-minima-and-single-variable-optimization",
        "title": "Maxima, minima and single-variable optimization",
        "intro": "Find stationary points from f′(x)=0, then classify using the second derivative or sign changes. Check endpoints and domain restrictions. Practise convexity, concavity and constrained intervals; do not assume every stationary point is an extremum.",
        "tags": [
          "critical point",
          "derivative sign",
          "second derivative",
          "endpoints"
        ],
        "example": "For x² on [−1,2], test x=0 and both endpoints. Values 0, 1 and 4 give a minimum at 0 and a maximum at 2.",
        "links": [
          [
            "Applications of derivatives",
            "https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new"
          ]
        ]
      }
    ]
  },
  {
    "title": "Programming, DS & Algorithms",
    "lessons": [
      {
        "id": "python-programming-fundamentals",
        "title": "Python programming fundamentals",
        "intro": "Review variables, types, operators, conditionals, loops, functions, recursion, lists, tuples, dictionaries, sets, slicing and mutability. Trace code line by line; understand aliasing, scope and common runtime errors.",
        "tags": [
          "slicing",
          "mutability",
          "aliasing",
          "dictionary",
          "control flow"
        ],
        "example": "If a=[1,2] and b=a, then b.append(3) changes both names' view of the same list. Use a.copy() for a separate shallow list.",
        "links": [
          [
            "Official Python tutorial",
            "https://docs.python.org/3/tutorial/"
          ],
          [
            "LearnPython",
            "https://www.learnpython.org/"
          ]
        ]
      },
      {
        "id": "complexity-analysis-time-and-space",
        "title": "Complexity analysis: time and space",
        "intro": "Express growth using Big-O, Big-Ω and Big-Θ. Compare constant, logarithmic, linear, n log n, quadratic and exponential growth. Analyse loops, nested loops, recursion and auxiliary space; distinguish worst, average and best cases.",
        "tags": [
          "Big O",
          "Θ",
          "worst case",
          "auxiliary space"
        ],
        "example": "If the inner loop runs i times for i=1 through n, total work is n(n+1)/2, so it grows as Θ(n²).",
        "links": [
          [
            "Asymptotic analysis",
            "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/"
          ]
        ]
      },
      {
        "id": "stacks-and-queues",
        "title": "Stacks and queues",
        "intro": "Stack follows LIFO; operations include push, pop and peek. Queue follows FIFO; operations include enqueue and dequeue. Know array/linked implementations, circular queues and applications such as expression evaluation and BFS.",
        "tags": [
          "LIFO",
          "FIFO",
          "push",
          "pop",
          "enqueue",
          "dequeue"
        ],
        "example": "Insert A then B. A stack removes B first. A queue removes A first.",
        "links": [
          [
            "VisuAlgo: linear structures",
            "https://visualgo.net/en/list"
          ]
        ]
      },
      {
        "id": "linked-lists",
        "title": "Linked lists",
        "intro": "Nodes store data and links. Compare singly, doubly and circular lists. Practise insertion, deletion, traversal, reversing and pointer updates. Understand O(1) insertion when the node position is known versus O(n) search.",
        "tags": [
          "node",
          "next pointer",
          "traversal",
          "head"
        ],
        "example": "To insert X after a known node A, point X to A's old successor, then point A to X. Finding A by scanning can take O(n), while rewiring takes O(1).",
        "links": [
          [
            "VisuAlgo: linked lists",
            "https://visualgo.net/en/list"
          ]
        ]
      },
      {
        "id": "trees-terminology-and-binary-trees",
        "title": "Trees: terminology and binary trees",
        "intro": "Know root, parent, child, sibling, leaf, depth, height, degree and subtree. A binary tree has at most two children per node. Distinguish full, complete, perfect and balanced trees; practise traversals: preorder, inorder, postorder and level order.",
        "tags": [
          "root",
          "leaf",
          "height",
          "preorder",
          "inorder",
          "postorder"
        ],
        "example": "For root A with children B and C, preorder gives A,B,C, inorder gives B,A,C, and postorder gives B,C,A.",
        "links": [
          [
            "Binary trees",
            "https://www.geeksforgeeks.org/binary-tree-data-structure/"
          ],
          [
            "VisuAlgo: BST",
            "https://visualgo.net/en/bst"
          ]
        ]
      },
      {
        "id": "binary-search-trees-bst",
        "title": "Binary Search Trees (BST)",
        "intro": "For each node, keys in the left subtree are smaller and keys in the right subtree are larger (under the usual unique-key convention). Search, insert and delete take O(h), where h is tree height; worst case can be O(n).",
        "tags": [
          "BST invariant",
          "inorder traversal",
          "skew",
          "height"
        ],
        "example": "Inserting 4,2,6 into an empty BST puts 2 left of 4 and 6 right. Searching for 6 takes one right turn. Inserting sorted keys can produce a chain.",
        "links": [
          [
            "BST visualisation",
            "https://visualgo.net/en/bst"
          ]
        ]
      },
      {
        "id": "hash-tables-and-collision-handling",
        "title": "Hash tables and collision handling",
        "intro": "Hash a key to an array index. Collisions are handled by chaining or open addressing (linear/quadratic probing, double hashing). Understand load factor, clustering and expected versus worst-case lookup complexity.",
        "tags": [
          "hash function",
          "collision",
          "chaining",
          "probing",
          "load factor"
        ],
        "example": "With h(k)=k mod 5, keys 2 and 7 both go to bucket 2. Chaining stores both in that bucket, while linear probing checks subsequent slots.",
        "links": [
          [
            "Hashing notes",
            "https://www.geeksforgeeks.org/hashing-data-structure/"
          ]
        ]
      },
      {
        "id": "searching-linear-and-binary-search",
        "title": "Searching: linear and binary search",
        "intro": "Linear search checks items sequentially and works on unsorted data. Binary search repeatedly halves a sorted search interval. Know loop invariants, boundary conditions and O(n) versus O(log n) time.",
        "tags": [
          "sorted input",
          "midpoint",
          "search interval",
          "logarithmic"
        ],
        "example": "To find 7 in [1,3,5,7,9], compare to 5, then keep just the right half. The next comparison can find 7.",
        "links": [
          [
            "Algorithm visualisations",
            "https://visualgo.net/en/sorting"
          ]
        ]
      },
      {
        "id": "elementary-sorting-selection-bubble-and-insertion",
        "title": "Elementary sorting: selection, bubble and insertion",
        "intro": "Selection repeatedly selects the minimum; bubble swaps adjacent out-of-order items; insertion grows a sorted prefix. Compare stability, in-place behaviour, best/worst cases and O(n²) worst-case time.",
        "tags": [
          "selection",
          "bubble",
          "insertion",
          "stability",
          "swaps"
        ],
        "example": "On [3,1,2], selection swaps 1 into the first position. A left-to-right bubble pass pushes 3 to the end. Insertion moves 1 before 3 to sort the first two items.",
        "links": [
          [
            "VisuAlgo: sorting",
            "https://visualgo.net/en/sorting"
          ]
        ]
      },
      {
        "id": "divide-and-conquer-merge-sort-and-quicksort",
        "title": "Divide and conquer: merge sort and quicksort",
        "intro": "Divide a problem, solve subproblems and combine. Merge sort is O(n log n) with extra merge space. Quicksort partitions around a pivot; average O(n log n), worst O(n²). Trace partitions and recurrences.",
        "tags": [
          "recurrence",
          "partition",
          "pivot",
          "merge"
        ],
        "example": "Merge sorted lists [1,4] and [2,3] by taking the smaller front element each time. Quicksort instead partitions around a pivot and may take Θ(n²) with repeatedly unbalanced partitions.",
        "links": [
          [
            "Sorting animations",
            "https://visualgo.net/en/sorting"
          ],
          [
            "Merge sort",
            "https://www.geeksforgeeks.org/merge-sort/"
          ],
          [
            "Quicksort",
            "https://www.geeksforgeeks.org/quick-sort-algorithm/"
          ]
        ]
      },
      {
        "id": "graph-theory-representations-and-terminology",
        "title": "Graph theory: representations and terminology",
        "intro": "Know vertices, edges, directed/undirected, weighted, degree, path, cycle, connected components and DAGs. Compare adjacency matrix O(V²) space with adjacency lists O(V+E) space.",
        "tags": [
          "adjacency list",
          "adjacency matrix",
          "degree",
          "directed graph"
        ],
        "example": "For an undirected edge A–B, store B in A's list and A in B's list. The same edge occupies two symmetric entries in an adjacency matrix.",
        "links": [
          [
            "VisuAlgo: graph structures",
            "https://visualgo.net/en/graphds"
          ]
        ]
      },
      {
        "id": "graph-traversals-bfs-and-dfs",
        "title": "Graph traversals: BFS and DFS",
        "intro": "BFS explores level by level using a queue and finds shortest paths in unweighted graphs. DFS explores deeply using recursion or a stack. Both run O(V+E) with adjacency lists. Practise traversal order and visited-set handling.",
        "tags": [
          "queue",
          "stack",
          "visited",
          "unweighted distance"
        ],
        "example": "If A links to B and C, and C links to D, BFS from A visits B and C at distance 1 before D at distance 2. DFS can reach D before visiting B.",
        "links": [
          [
            "BFS/DFS visualisation",
            "https://visualgo.net/en/dfsbfs"
          ]
        ]
      },
      {
        "id": "shortest-path-algorithms",
        "title": "Shortest path algorithms",
        "intro": "Dijkstra finds shortest paths from a source with non-negative edge weights; it is not valid for negative edges. Bellman–Ford handles negative edges and detects reachable negative cycles. Know when BFS suffices for unweighted graphs.",
        "tags": [
          "relaxation",
          "Dijkstra",
          "Bellman–Ford",
          "edge weights"
        ],
        "example": "If A→B costs 5, A→C costs 1, and C→B costs 2, relaxing C→B improves the distance to B from 5 to 3. Dijkstra requires nonnegative edge weights.",
        "links": [
          [
            "Shortest-path visualisation",
            "https://visualgo.net/en/sssp"
          ]
        ]
      }
    ]
  },
  {
    "title": "Database & Warehousing",
    "lessons": [
      {
        "id": "er-model",
        "title": "ER model",
        "intro": "Model entities, attributes and relationships. Understand keys, cardinality (1:1, 1:N, M:N), participation constraints, weak entities and mapping ER diagrams to relational tables.",
        "tags": [
          "entity",
          "relationship",
          "cardinality",
          "participation"
        ],
        "example": "Students and Courses can have a many-to-many Enrolls relationship. Store enrolments in an Enrollment table with a student ID and a course ID.",
        "links": [
          [
            "ER model notes",
            "https://www.geeksforgeeks.org/introduction-of-er-model/"
          ]
        ]
      },
      {
        "id": "relational-model-keys-and-integrity-constraints",
        "title": "Relational model, keys and integrity constraints",
        "intro": "A relation is a table of tuples over attributes. Know superkeys, candidate keys, primary/foreign keys, entity integrity and referential integrity. Practise identifying valid schemas and constraint violations.",
        "tags": [
          "candidate key",
          "primary key",
          "foreign key",
          "referential integrity"
        ],
        "example": "Enrollment.student_id can point to Student.id. If that constraint is enforced, an enrolment cannot reference a student ID absent from Student.",
        "links": [
          [
            "PostgreSQL tutorial",
            "https://www.postgresql.org/docs/current/tutorial.html"
          ]
        ]
      },
      {
        "id": "relational-algebra",
        "title": "Relational algebra",
        "intro": "Core operators: selection σ, projection π, union, difference, Cartesian product, rename and joins. Practise translating English queries into expressions and applying operator order and set semantics.",
        "tags": [
          "selection",
          "projection",
          "join",
          "difference",
          "set semantics"
        ],
        "example": "To get names of CS students, select rows where department=CS, then project the name column. Classical relational algebra removes duplicate result tuples.",
        "links": [
          [
            "Relational algebra",
            "https://www.geeksforgeeks.org/dbms/relational-algebra-in-dbms/"
          ]
        ]
      },
      {
        "id": "tuple-relational-calculus",
        "title": "Tuple relational calculus",
        "intro": "A declarative query language describing which tuples satisfy a predicate. Learn tuple variables, existential and universal quantifiers, and safe expressions. Contrast the declarative style with relational algebra's operators.",
        "tags": [
          "tuple variable",
          "predicate",
          "quantifier",
          "safe query"
        ],
        "example": "To find CS students, describe the desired tuples as t such that Student(t) and t.department='CS'. The predicate states the condition each result must satisfy.",
        "links": [
          [
            "Tuple calculus notes",
            "https://www.geeksforgeeks.org/dbms/tuple-relational-calculus-trc-in-dbms/"
          ]
        ]
      },
      {
        "id": "sql-select-filtering-joins-grouping-and-subqueries",
        "title": "SQL: SELECT, filtering, joins, grouping and subqueries",
        "intro": "Practise SELECT-FROM-WHERE, DISTINCT, ORDER BY, aggregate functions, GROUP BY, HAVING, inner/outer joins, nested queries, EXISTS, IN and NULL semantics. Understand logical query processing and duplicate rows.",
        "tags": [
          "WHERE",
          "JOIN",
          "GROUP BY",
          "HAVING",
          "NULL"
        ],
        "example": "To find departments with more than five active students, filter active rows with WHERE, group by department, then use HAVING COUNT(*) > 5.",
        "links": [
          [
            "SQLBolt interactive SQL",
            "https://sqlbolt.com/"
          ],
          [
            "PostgreSQL tutorial",
            "https://www.postgresql.org/docs/current/tutorial.html"
          ]
        ]
      },
      {
        "id": "functional-dependencies-and-normal-forms",
        "title": "Functional dependencies and normal forms",
        "intro": "Functional dependency X→Y means X determines Y. Find candidate keys and attribute closures. Understand 1NF, 2NF, 3NF and BCNF, lossless decomposition and dependency preservation at the level required by the syllabus.",
        "tags": [
          "functional dependency",
          "attribute closure",
          "2NF",
          "3NF",
          "BCNF"
        ],
        "example": "If StudentID determines DeptID and DeptID determines DeptName, storing DeptName in every student row repeats it. A Department table can store each department name once.",
        "links": [
          [
            "Normalisation guide",
            "https://www.geeksforgeeks.org/dbms/database-normalization-normal-forms-1nf-2nf-3nf-bcnf/"
          ]
        ]
      },
      {
        "id": "file-organisation-and-indexing",
        "title": "File organisation and indexing",
        "intro": "Compare heap, sequential and hashed file organisation. Indexes speed retrieval but add storage and update cost. Understand primary/secondary, dense/sparse and B/B+ tree index concepts; practise tree search and fan-out intuition.",
        "tags": [
          "heap file",
          "B+ tree",
          "hash index",
          "range query"
        ],
        "example": "A B+ tree on price can find the start of the 100–200 range and scan successive keys. A hash index is suited to exact matches.",
        "links": [
          [
            "PostgreSQL indexes",
            "https://www.postgresql.org/docs/current/indexes.html"
          ]
        ]
      },
      {
        "id": "data-types-and-data-transformation",
        "title": "Data types and data transformation",
        "intro": "Know numeric, categorical, ordinal and temporal data. Normalisation rescales values; discretisation converts continuous values into bins; sampling selects representative records; compression reduces storage. Understand purpose and trade-offs.",
        "tags": [
          "normalization",
          "standardization",
          "discretization",
          "encoding"
        ],
        "example": "For min–max scaling, 30 in a training range of 10 to 50 maps to (30−10)/(50−10)=0.5. Reuse the training minimum and maximum when transforming validation data.",
        "links": [
          [
            "Scikit-learn preprocessing",
            "https://scikit-learn.org/stable/modules/preprocessing.html"
          ]
        ]
      },
      {
        "id": "data-warehouse-modelling-and-multidimensional-schemas",
        "title": "Data warehouse modelling and multidimensional schemas",
        "intro": "A warehouse supports analytical queries. Learn fact tables, dimension tables, measures, star schema, snowflake schema and concept hierarchies such as city→state→country or day→month→year. Distinguish OLTP from OLAP.",
        "tags": [
          "fact table",
          "dimension table",
          "grain",
          "star schema",
          "OLAP"
        ],
        "example": "A sales fact row might represent one purchased product on a receipt. Date, store and product dimensions let you roll those rows up to monthly store totals.",
        "links": [
          [
            "IBM: data warehouse concepts",
            "https://www.ibm.com/think/topics/data-warehouse"
          ]
        ]
      },
      {
        "id": "measures-categorisation-and-computation",
        "title": "Measures: categorisation and computation",
        "intro": "Measures are facts analysed across dimensions. Distinguish additive, semi-additive and non-additive measures; practise aggregation such as sum, count, average and ratios across dimensions and hierarchy levels.",
        "tags": [
          "additive",
          "semi-additive",
          "non-additive",
          "aggregation"
        ],
        "example": "Sum revenue across stores. When combining conversion rates across stores, divide total conversions by total visits so large and small stores receive the correct weights.",
        "links": [
          [
            "Warehouse modelling overview",
            "https://www.ibm.com/think/topics/data-warehouse"
          ]
        ]
      }
    ]
  },
  {
    "title": "Machine Learning",
    "lessons": [
      {
        "id": "supervised-learning-regression-vs-classification",
        "title": "Supervised learning: regression vs classification",
        "intro": "Regression predicts continuous targets; classification predicts discrete classes. Understand features, labels, training/test splits, generalisation, overfitting and underfitting. Match task type to suitable metrics.",
        "tags": [
          "label",
          "target",
          "regression",
          "classification"
        ],
        "example": "Predicting a house price asks for a numeric value. Predicting whether a loan will default asks for a class or its probability.",
        "links": [
          [
            "Scikit-learn supervised learning",
            "https://scikit-learn.org/stable/supervised_learning.html"
          ]
        ]
      },
      {
        "id": "simple-and-multiple-linear-regression",
        "title": "Simple and multiple linear regression",
        "intro": "Model y as a linear combination of features. Fit coefficients by least squares; understand residuals, assumptions, intercept, R² and the effect of correlated predictors. Be able to calculate predictions and interpret coefficients.",
        "tags": [
          "ordinary least squares",
          "residual",
          "slope",
          "intercept"
        ],
        "example": "For points (1,3) and (2,5), the line ŷ=2x+1 passes through both. A third point off the line creates a residual equal to observed minus predicted.",
        "links": [
          [
            "An Introduction to Statistical Learning (free book)",
            "https://www.statlearning.com/"
          ]
        ]
      },
      {
        "id": "ridge-regression",
        "title": "Ridge regression",
        "intro": "Ridge minimises squared error plus λ times the sum of squared coefficients. It shrinks coefficients to reduce variance and multicollinearity effects; coefficients are generally not exactly zero. Feature scaling matters.",
        "tags": [
          "L2 penalty",
          "λ",
          "shrinkage",
          "regularization"
        ],
        "example": "Ridge adds λ times the sum of squared slope coefficients to the training loss. Increasing λ penalizes large weights more heavily, which can help with correlated predictors.",
        "links": [
          [
            "Scikit-learn linear models",
            "https://scikit-learn.org/stable/modules/linear_model.html"
          ]
        ]
      },
      {
        "id": "logistic-regression",
        "title": "Logistic regression",
        "intro": "Classification model that maps a linear score through the sigmoid to estimate class probability. Understand log-odds, decision threshold, likelihood/cross-entropy and how changing threshold affects precision and recall.",
        "tags": [
          "sigmoid",
          "log-odds",
          "decision threshold",
          "cross-entropy"
        ],
        "example": "A score of 0 maps to probability 0.5. At probability 0.7, a threshold of 0.5 gives the positive class, while a threshold of 0.8 gives the negative class.",
        "links": [
          [
            "Logistic regression",
            "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression"
          ]
        ]
      },
      {
        "id": "k-nearest-neighbours-k-nn",
        "title": "k-Nearest Neighbours (k-NN)",
        "intro": "Predict from the k closest training points. Understand distance metrics, voting/averaging, k selection, scaling and decision boundaries. Small k can overfit; large k can oversmooth. Prediction cost can be high.",
        "tags": [
          "distance",
          "majority vote",
          "scaling",
          "k"
        ],
        "example": "If the three nearest labels are A,A,B, a standard 3-NN classifier predicts A. Scaling features matters because larger numeric units can dominate distance.",
        "links": [
          [
            "Scikit-learn neighbours",
            "https://scikit-learn.org/stable/modules/neighbors.html"
          ]
        ]
      },
      {
        "id": "naive-bayes-classifier",
        "title": "Naive Bayes classifier",
        "intro": "Apply Bayes' rule with conditional independence of features given the class. Compare Gaussian, multinomial and Bernoulli variants. Practise posterior comparison, priors, likelihoods and zero-frequency smoothing.",
        "tags": [
          "prior",
          "likelihood",
          "conditional independence",
          "smoothing"
        ],
        "example": "To classify a message with two words, multiply each class prior by the probability of each word given that class, then compare the two class scores. Smoothing can prevent a single unseen word from making the score zero.",
        "links": [
          [
            "Naive Bayes guide",
            "https://scikit-learn.org/stable/modules/naive_bayes.html"
          ]
        ]
      },
      {
        "id": "linear-discriminant-analysis-lda",
        "title": "Linear Discriminant Analysis (LDA)",
        "intro": "LDA models class-conditional distributions (commonly Gaussian with shared covariance) and derives linear decision boundaries. Also understand its dimensionality-reduction interpretation and contrast with PCA.",
        "tags": [
          "shared covariance",
          "class means",
          "Fisher direction"
        ],
        "example": "If two one-dimensional classes have means 2 and 6, equal variance and equal priors, the LDA boundary is at 4.",
        "links": [
          [
            "LDA/QDA guide",
            "https://scikit-learn.org/stable/modules/lda_qda.html"
          ]
        ]
      },
      {
        "id": "support-vector-machines-svm",
        "title": "Support Vector Machines (SVM)",
        "intro": "SVM finds a separating hyperplane with maximum margin. Support vectors define the boundary. Understand hard/soft margin, C, hinge loss and kernel idea for nonlinear boundaries; scaling affects performance.",
        "tags": [
          "margin",
          "support vectors",
          "soft margin",
          "kernel",
          "C"
        ],
        "example": "If the nearest points of the two classes are at x=2 and x=4 on a line, the hard-margin separator is x=3. Those nearest points are the support vectors.",
        "links": [
          [
            "Scikit-learn SVM",
            "https://scikit-learn.org/stable/modules/svm.html"
          ]
        ]
      },
      {
        "id": "decision-trees",
        "title": "Decision trees",
        "intro": "Split features to make child nodes purer. Learn entropy, information gain, Gini impurity, greedy splitting, stopping criteria and pruning. Trees are interpretable but can have high variance and overfit.",
        "tags": [
          "Gini impurity",
          "entropy",
          "information gain",
          "leaf"
        ],
        "example": "A node with two positive and two negative samples has Gini impurity 0.5. A split into two pure leaves reduces the weighted child impurity to 0.",
        "links": [
          [
            "Decision trees",
            "https://scikit-learn.org/stable/modules/tree.html"
          ],
          [
            "StatQuest videos",
            "https://www.youtube.com/@statquest"
          ]
        ]
      },
      {
        "id": "bias-variance-trade-off",
        "title": "Bias-variance trade-off",
        "intro": "Bias reflects systematic error from overly simple assumptions; variance reflects sensitivity to training data. Model complexity often lowers bias but raises variance. Use validation and regularisation to balance generalisation error.",
        "tags": [
          "underfitting",
          "overfitting",
          "model complexity"
        ],
        "example": "A line fitted to strongly curved data can have high bias. A curve that follows every noisy training point can have high variance and perform poorly on fresh data.",
        "links": [
          [
            "ISLR textbook",
            "https://www.statlearning.com/"
          ]
        ]
      },
      {
        "id": "cross-validation-k-fold-and-leave-one-out",
        "title": "Cross-validation: k-fold and leave-one-out",
        "intro": "Split data into folds, train on some and validate on the held-out fold. k-fold averages across k runs; LOOCV uses one observation per validation fold. Prevent data leakage; fit preprocessing only on each training fold.",
        "tags": [
          "validation fold",
          "k-fold",
          "LOOCV",
          "leakage"
        ],
        "example": "With 100 samples and 5 folds, train on 80 and validate on 20 each time. Fit preprocessing on the training 80 separately in every fold.",
        "links": [
          [
            "Cross-validation guide",
            "https://scikit-learn.org/stable/modules/cross_validation.html"
          ]
        ]
      },
      {
        "id": "multi-layer-perceptron-and-feed-forward-neural-networks",
        "title": "Multi-layer perceptron and feed-forward neural networks",
        "intro": "Layers apply weighted sums and nonlinear activations. Understand input/hidden/output layers, forward propagation, loss, gradient descent and backpropagation at a conceptual level. Nonlinear activations let networks model nonlinear functions.",
        "tags": [
          "layer",
          "weights",
          "activation",
          "forward pass",
          "backpropagation"
        ],
        "example": "A neuron with inputs (1,2), weights (2,−3), and zero bias has score −4. ReLU maps that score to 0.",
        "links": [
          [
            "3Blue1Brown neural networks",
            "https://www.3blue1brown.com/topics/neural-networks"
          ],
          [
            "CS231n notes",
            "https://cs231n.github.io/neural-networks-1/"
          ]
        ]
      },
      {
        "id": "unsupervised-learning-and-clustering",
        "title": "Unsupervised learning and clustering",
        "intro": "Find structure without labels. Understand cluster assignment, similarity/distance, within-cluster compactness and the impact of scaling and outliers. Compare clustering with classification.",
        "tags": [
          "unlabelled data",
          "clustering",
          "similarity",
          "distance"
        ],
        "example": "With points near 0 and near 10 on a line, a two-cluster method can discover those groups without being given category labels.",
        "links": [
          [
            "Clustering guide",
            "https://scikit-learn.org/stable/modules/clustering.html"
          ]
        ]
      },
      {
        "id": "k-means-and-k-medoids",
        "title": "k-means and k-medoids",
        "intro": "k-means alternates assigning points to nearest centroid and updating means; it minimises within-cluster squared distances and is sensitive to initialisation/outliers. k-medoids uses actual data points as centres and can be more robust.",
        "tags": [
          "centroid",
          "medoid",
          "assignment",
          "update"
        ],
        "example": "For points 0,2,9, the mean is 11/3, which need not be a data point. The medoid under absolute distance is 2, an observed point that minimizes total distance.",
        "links": [
          [
            "k-means",
            "https://scikit-learn.org/stable/modules/clustering.html#k-means"
          ]
        ]
      },
      {
        "id": "hierarchical-clustering-agglomerative-and-divisive",
        "title": "Hierarchical clustering: agglomerative and divisive",
        "intro": "Agglomerative is bottom-up: start with singletons and merge. Divisive is top-down: start with one cluster and split. Dendrograms show merge levels. Know single, complete, average and Ward linkage at a conceptual level.",
        "tags": [
          "dendrogram",
          "linkage",
          "bottom-up",
          "top-down"
        ],
        "example": "For points 0,1,8, an agglomerative method starting from singleton clusters first merges 0 and 1. Cutting the resulting dendrogram before the next merge leaves two clusters.",
        "links": [
          [
            "Hierarchical clustering",
            "https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering"
          ]
        ]
      },
      {
        "id": "dimensionality-reduction-and-principal-component-analysis-pca",
        "title": "Dimensionality reduction and Principal Component Analysis (PCA)",
        "intro": "PCA finds orthogonal directions of maximum variance. Centre (and often scale) data, compute covariance/eigendecomposition or SVD, rank components and project. Explained variance measures retained information; PCA is unsupervised.",
        "tags": [
          "centering",
          "covariance",
          "principal component",
          "explained variance"
        ],
        "example": "If centered data vary much more along x than y and covariance is zero, the first component is the x-axis. Keeping that one component discards variation along y.",
        "links": [
          [
            "PCA guide",
            "https://scikit-learn.org/stable/modules/decomposition.html#pca"
          ],
          [
            "StatQuest",
            "https://www.youtube.com/@statquest"
          ]
        ]
      }
    ]
  },
  {
    "title": "Artificial Intelligence",
    "lessons": [
      {
        "id": "problem-formulation-and-state-space-search",
        "title": "Problem formulation and state-space search",
        "intro": "Represent an AI problem using initial state, actions, transition model, goal test and path cost. A search tree explores possible states. Distinguish state space from search tree and avoid revisiting states where appropriate.",
        "tags": [
          "initial state",
          "action",
          "transition",
          "goal test",
          "path cost"
        ],
        "example": "In a maze, the state can be the current cell, actions are legal moves, and the goal test checks whether you reached the exit. With unit-cost moves, path cost is the number of moves.",
        "links": [
          [
            "Search introduction",
            "https://www.cs.cmu.edu/~15110-s13/Wing/recitations/recitation21.pdf"
          ],
          [
            "AI lecture search",
            "https://www.youtube.com/@UC Berkeley AI"
          ]
        ]
      },
      {
        "id": "uninformed-search-bfs-dfs-uniform-cost-and-depth-limited-ideas",
        "title": "Uninformed search: BFS, DFS, uniform-cost and depth-limited ideas",
        "intro": "Uninformed methods use no heuristic estimate. BFS expands shallowest nodes; DFS deepest; uniform-cost expands lowest path cost. Compare completeness, optimality, time and memory under stated assumptions.",
        "tags": [
          "frontier",
          "depth limit",
          "uniform cost",
          "path cost"
        ],
        "example": "If a direct goal edge costs 8 and a two-edge route costs 2+2, BFS favors the one-edge route. Uniform-cost search favors the two-edge route because its cost is 4.",
        "links": [
          [
            "Search algorithms overview",
            "https://www.geeksforgeeks.org/search-algorithms-in-ai/"
          ]
        ]
      },
      {
        "id": "informed-search-heuristics-and-a",
        "title": "Informed search: heuristics and A*",
        "intro": "Heuristics estimate remaining cost. A* uses f(n)=g(n)+h(n). Admissible heuristics never overestimate; consistency obeys a triangle-like condition. Practise node expansion and compare greedy best-first with A*.",
        "tags": [
          "heuristic",
          "admissibility",
          "consistency",
          "f=g+h"
        ],
        "example": "In a four-direction grid with unit steps, Manhattan distance is a lower bound on steps to the goal. A* adds it to the cost already spent when ordering the frontier.",
        "links": [
          [
            "A* visual guide",
            "https://www.redblobgames.com/pathfinding/a-star/introduction.html"
          ]
        ]
      },
      {
        "id": "adversarial-search-minimax-and-alpha-beta-pruning",
        "title": "Adversarial search: minimax and alpha-beta pruning",
        "intro": "For competitive games, minimax chooses moves assuming an optimal opponent. Alpha-beta pruning skips branches that cannot change the decision. Know MAX/MIN levels, utility values and how move ordering affects pruning.",
        "tags": [
          "MAX",
          "MIN",
          "game tree",
          "α",
          "β",
          "pruning"
        ],
        "example": "If MAX can already guarantee 5, and a different MIN branch has a child worth 3, that branch can return at most 3. Further children there cannot change MAX's choice.",
        "links": [
          [
            "Minimax introduction",
            "https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/"
          ]
        ]
      },
      {
        "id": "propositional-logic",
        "title": "Propositional logic",
        "intro": "Use propositions and connectives NOT, AND, OR, implication and biconditional. Learn truth tables, equivalence, satisfiability, entailment and inference. Translate natural-language statements carefully.",
        "tags": [
          "implication",
          "truth table",
          "equivalence",
          "contrapositive"
        ],
        "example": "P→Q is false only when P is true and Q is false. Its contrapositive ¬Q→¬P has the same truth values.",
        "links": [
          [
            "Classical logic overview",
            "https://plato.stanford.edu/entries/logic-classical/"
          ]
        ]
      },
      {
        "id": "predicate-logic",
        "title": "Predicate logic",
        "intro": "Extend propositional logic with predicates, variables and quantifiers ∀ and ∃. Practise translating statements, negating quantified expressions and understanding scope. Distinguish predicates from propositions.",
        "tags": [
          "universal",
          "existential",
          "scope",
          "quantifier negation"
        ],
        "example": "The negation of 'Every student submitted' is 'At least one student did not submit.' Negating ∀ changes it to ∃ and negates the inner predicate.",
        "links": [
          [
            "Logic lecture notes",
            "https://www.cs.cornell.edu/courses/cs2800/2017sp/lectures/lec05-logic.pdf"
          ]
        ]
      },
      {
        "id": "conditional-independence-and-probabilistic-graphical-models",
        "title": "Conditional independence and probabilistic graphical models",
        "intro": "Conditional independence means X and Y become independent given Z. Bayesian networks encode a joint distribution as a product of local conditional distributions. Read graph structure and identify valid independence claims carefully.",
        "tags": [
          "Bayesian network",
          "DAG",
          "d-separation",
          "collider"
        ],
        "example": "In the chain A→B→C, observing B blocks the path between A and C. In the collider A→B←C, observing B can open the path.",
        "links": [
          [
            "Bayesian networks introduction",
            "https://www.cs.ubc.ca/~murphyk/Bayes/bnintro.html"
          ]
        ]
      },
      {
        "id": "exact-inference-by-variable-elimination",
        "title": "Exact inference by variable elimination",
        "intro": "Compute a query distribution by multiplying relevant factors and summing out hidden variables in a chosen order. Practise factor tables and normalisation. Elimination order affects intermediate factor size and computational cost.",
        "tags": [
          "factor",
          "evidence",
          "marginalization",
          "elimination order"
        ],
        "example": "To remove hidden X from P(X)P(Y|X), sum their product over X. The result is a factor on Y, equal here to P(Y).",
        "links": [
          [
            "Bayesian network notes",
            "https://www.cs.ubc.ca/~murphyk/Bayes/bnintro.html"
          ]
        ]
      },
      {
        "id": "approximate-inference-by-sampling",
        "title": "Approximate inference by sampling",
        "intro": "Estimate probabilities using samples when exact computation is expensive. Understand prior/rejection sampling and the basic idea of likelihood weighting or Gibbs sampling if encountered in practice material. More representative samples generally reduce Monte Carlo error.",
        "tags": [
          "Monte Carlo",
          "rejection sampling",
          "likelihood weighting",
          "Gibbs sampling"
        ],
        "example": "If 100 simulated cases match the evidence and 30 of those also match the query, rejection sampling estimates the conditional probability as 30/100.",
        "links": [
          [
            "Probabilistic reasoning",
            "https://www.cs.ubc.ca/~murphyk/Bayes/bnintro.html"
          ]
        ]
      }
    ]
  },
  {
    "title": "General Aptitude",
    "lessons": [
      {
        "id": "verbal-ability",
        "title": "Verbal ability",
        "intro": "Practise grammar, sentence completion, vocabulary in context, reading comprehension, inference, paragraph coherence and critical reasoning. Focus on accuracy and avoid spending too long on one passage.",
        "tags": [
          "grammar",
          "context clues",
          "inference",
          "sentence completion"
        ],
        "example": "In 'Sales increased, although profit fell,' the word 'although' signals contrast. Use the connector to test which completion fits both clauses.",
        "links": [
          [
            "Official GATE portal",
            "https://gate2027.iitm.ac.in/"
          ],
          [
            "Verbal practice",
            "https://www.indiabix.com/verbal-ability/questions-and-answers/"
          ]
        ]
      },
      {
        "id": "numerical-ability",
        "title": "Numerical ability",
        "intro": "Revise arithmetic, percentages, ratios, averages, profit/loss, time-work, speed-distance, number systems, logarithms, series, basic statistics and data interpretation. Practise mental calculation and approximation.",
        "tags": [
          "percentage change",
          "ratio",
          "average",
          "data interpretation"
        ],
        "example": "A price of 100 rising 20% becomes 120. A 20% fall from 120 gives 96 because the second percentage uses a different base.",
        "links": [
          [
            "Quantitative aptitude practice",
            "https://www.indiabix.com/quantitative-aptitude/questions-and-answers/"
          ]
        ]
      },
      {
        "id": "analytical-and-spatial-reasoning",
        "title": "Analytical and spatial reasoning",
        "intro": "Practise logical deductions, arrangements, conditions, patterns, data sufficiency, visualisation and spatial relationships. Draw tables/diagrams for multi-condition problems instead of holding all constraints in memory.",
        "tags": [
          "constraints",
          "elimination",
          "rotation",
          "reflection"
        ],
        "example": "If A sits left of B and B sits left of C in a row, combine the constraints to get A left of C before testing the answer options.",
        "links": [
          [
            "Reasoning practice",
            "https://www.indiabix.com/logical-reasoning/questions-and-answers/"
          ]
        ]
      }
    ]
  }
];
