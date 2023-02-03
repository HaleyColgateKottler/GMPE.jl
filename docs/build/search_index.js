var documenterSearchIndex = {"docs":
[{"location":"#GMMParameterEstimation.jl-Documentation","page":"Documentation","title":"GMMParameterEstimation.jl Documentation","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"GMMParameterEstimation.jl is a package for estimating the parameters of Gaussian k-mixture models using the method of moments. It works for general k with known mixing coefficients, and for k=2,3,4 for unknown mixing coefficients.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"#Example","page":"Documentation","title":"Example","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"The following code snippet will generate a 3D 2-mixture, take a sample, compute the necessary moments, and then return an estimate of the parameters using the method of moments.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"using GMMParameterEstimation\nd = 3\nk = 2\ndiagonal = true\nnum_samples = 10^4\nw, true_means, true_covariances = generateGaussians(d, k, diagonal)\nsample = getSample(num_samples, w, true_means, true_covariances)\nfirst_moms, diagonal_moms, off_diagonals = sampleMoments(sample, k)\npass, (mixing_coefficients, means, covariances) = estimate_parameters(d, k, first_moms, diagonal_moms, off_diagonals, diagonal)","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"#Parameter-estimation","page":"Documentation","title":"Parameter estimation","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"The main functionality of this package stems from ","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"estimate_parameters","category":"page"},{"location":"#GMMParameterEstimation.estimate_parameters","page":"Documentation","title":"GMMParameterEstimation.estimate_parameters","text":"estimate_parameters(d::Integer, k::Integer, first::Vector{Float64}, second::Matrix{Float64}, last::Dict{Vector{Int64}, Expression})\n\nCompute an estimate for the parameters of a d-dimensional Gaussian k-mixture model from the moments.\n\nFor the unknown mixing coefficient dense covariance matrix case, first should be a list of moments 0 through 3k for the first dimension, second should be a matrix of moments 1 through 2k+1 for the remaining dimensions, and last should be a dictionary of the indices as lists of integers and the corresponding moments.  This requires k<= 4.\n\n\n\n\n\nestimate_parameters(d::Integer, k::Integer, w::Array{Float64}, first::Vector{Float64}, second::Matrix{Float64}, last::Dict{Vector{Int64}, Expression})\n\nCompute an estimate for the parameters of a d-dimensional Gaussian k-mixture model from the moments.\n\nFor the known mixing coefficient dense covariance matrix case, w should be a vector of the mixing coefficients first should be a list of moments 0 through 3k for the first dimension, second should be a matrix of moments 1 through 2k+1 for the remaining dimensions, and last should be a dictionary of the indices as lists of integers and the corresponding moments.\n\n\n\n\n\nestimate_parameters(d::Integer, k::Integer, first::Vector{Float64}, second::Matrix{Float64})\n\nCompute an estimate for the parameters of a d-dimensional Gaussian k-mixture model from the moments.\n\nFor the unknown mixing coefficient diagonal covariance matrix case, first should be a list of moments 0 through 3k for the first dimension, and second should be a matrix of moments 1 through 2k+1 for the remaining dimensions.  This requires k<= 4.\n\n\n\n\n\nestimate_parameters(d::Integer, k::Integer, w::Array{Float64}, first::Vector{Float64}, second::Matrix{Float64})\n\nCompute an estimate for the parameters of a d-dimensional Gaussian k-mixture model from the moments.\n\nFor the known mixing coefficient diagonal covariance matrix case, w should be a vector of the mixing coefficients first should be a list of moments 0 through 3k for the first dimension, and second should be a matrix of moments 1 through 2k+1 for the remaining dimensions..\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"which computes the parameter recovery using Algorithm 1 from Estimating Gaussian Mixtures Using Sparse Polynomial Moment Systems.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"In one dimension, for a random variable X with density f we define the ith moment as  m_i=EX^i=int xf(x)dx.   For a Gaussian mixture model, this results in a polynomial in the parameters.  For a sample y_1y_2dotsy_N, we define the ith sample moment as  overlinem_i=frac1Nsum_j=1^N y_j^i.   The sample moments approach the true moments as Nrightarrowinfty, so by setting the polynomials equal to the empirical moments, we can then solve the polynomial system to recover the parameters.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"For a multivariate random variable X with density f_X we define the moments as  m_i_1dotsi_n = EX_1^i_1cdots X_n^i_n = intcdotsint x_1^i_1cdots x_n^i_nf_X(x_1dotsx_n)dx_1cdots dx_n  and the empirical moments as  overlinem_i_1dotsi_n = frac1Nsum_j=1^Ny_j_1^i_1cdots y_j_n^i_n.   And again, by setting the polynomials equal to the empirical moments, we can then solve the system of polynomials to recover the parameters.  However, choosing which moments becomes more complicated.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"#Generate-and-sample-from-Gaussian-Mixture-Models","page":"Documentation","title":"Generate and sample from Gaussian Mixture Models","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"makeCovarianceMatrix","category":"page"},{"location":"#GMMParameterEstimation.makeCovarianceMatrix","page":"Documentation","title":"GMMParameterEstimation.makeCovarianceMatrix","text":"makeCovarianceMatrix(d::Integer, diagonal::Bool)\n\nGenerate random dxd covariance matrix.\n\nIf diagonal==true, returns a diagonal covariance matrix.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"Note that the entries of the resulting covariance matrices are generated from a normal distribution centered at 0 with variance 1.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"generateGaussians","category":"page"},{"location":"#GMMParameterEstimation.generateGaussians","page":"Documentation","title":"GMMParameterEstimation.generateGaussians","text":"generateGaussians(d::Integer, k::Integer, diagonal::Bool)\n\nGenerate means and covariances for k Gaussians with dimension d.\n\ndiagonal should be true for spherical case, and false for dense covariance matrices.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"The parameters are returned as a tuple, with weights in a 1D vector, means as a k x d array, and variances as a k x d x d array.  Note that each entry of each parameter is generated from a normal distribution centered at 0 with variance 1.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"getSample","category":"page"},{"location":"#GMMParameterEstimation.getSample","page":"Documentation","title":"GMMParameterEstimation.getSample","text":"getSample(numb::Integer, w::Vector{Float64}, means::Matrix{Float64}, covariances::Vector)\n\nGenerate a Gaussian mixture model sample with numb entries, mixing coefficients w, means means, and covariances covariances.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"This relies on the Distributions package.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"sampleMoments\ndiagonalPerfectMoments\ndensePerfectMoments","category":"page"},{"location":"#GMMParameterEstimation.sampleMoments","page":"Documentation","title":"GMMParameterEstimation.sampleMoments","text":"sampleMoments(sample::Matrix{Float64}, k; diagonal = false)\n\nUse the sample to compute the moments necessary for parameter estimation using method of moments.\n\nReturns moments 0 to 3k for the first dimension, moments 1 through 2k+1 for the other dimensions as a matrix, and a dictionary with indices and moments for the off-diagonal system if diagonal is false.\n\n\n\n\n\n","category":"function"},{"location":"#GMMParameterEstimation.diagonalPerfectMoments","page":"Documentation","title":"GMMParameterEstimation.diagonalPerfectMoments","text":"diagonalPerfectMoments(d, k, w, truemeans, truecovariances)\n\nUse the given parameters to compute the exact moments necessary for parameter estimation with diagonal covariance matrices.\n\nReturns moments 0 to 3k for the first dimension, and moments 1 through 2k+1 for the other dimensions as a matrix.\n\n\n\n\n\n","category":"function"},{"location":"#GMMParameterEstimation.densePerfectMoments","page":"Documentation","title":"GMMParameterEstimation.densePerfectMoments","text":"densePerfectMoments(d, k, w, true_means, true_covariances)\n\nUse the given parameters to compute the exact moments necessary for parameter estimation with dense covariance matrices.\n\nReturns moments 0 to 3k for the first dimension, moments 1 through 2k+1 for the other dimensions as a matrix, and a dictionary with indices and moments for the off-diagonal system.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"Both expect parameters to be given with weights in a 1D vector, means as a k x d array, and variances as a k x d x d array.","category":"page"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"},{"location":"#Build-the-polynomial-systems","page":"Documentation","title":"Build the polynomial systems","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"build1DSystem","category":"page"},{"location":"#GMMParameterEstimation.build1DSystem","page":"Documentation","title":"GMMParameterEstimation.build1DSystem","text":"build1DSystem(k::Integer, m::Integer)\n\nBuild the polynomial system for a mixture of 1D Gaussians where 'm'-1 is the highest desired moment and the mixing coefficients are unknown.\n\n\n\n\n\nbuild1DSystem(k::Integer, m::Integer, a::Union{Vector{Float64}, Vector{Variable}})\n\nBuild the polynomial system for a mixture of 1D Gaussians where 'm'-1 is the highest desired moment, and a is a vector of the mixing coefficients.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"selectSol","category":"page"},{"location":"#GMMParameterEstimation.selectSol","page":"Documentation","title":"GMMParameterEstimation.selectSol","text":"selectSol(k::Integer, solution::Result, polynomial::Expression, moment::Number)\n\nSelect a k mixture solution from solution accounting for polynomial and moment.\n\nSort out a k mixture statistically significant solutions from solution, and return the one closest to moment when polynomial is evaluated at those values.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"tensorPower","category":"page"},{"location":"#GMMParameterEstimation.tensorPower","page":"Documentation","title":"GMMParameterEstimation.tensorPower","text":"tensorPower(tensor, power::Integer)\n\nCompute the power tensor power of tensor.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"convert_indexing","category":"page"},{"location":"#GMMParameterEstimation.convert_indexing","page":"Documentation","title":"GMMParameterEstimation.convert_indexing","text":"convert_indexing(moment_i, d)\n\nConvert the d dimensional multivariate moment_i index to the corresponding tensor moment index.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Documentation","title":"Documentation","text":"mixedMomentSystem","category":"page"},{"location":"#GMMParameterEstimation.mixedMomentSystem","page":"Documentation","title":"GMMParameterEstimation.mixedMomentSystem","text":"mixedMomentSystem(d, k, mixing, ms, vs)\n\nBuild a linear system for finding the off-diagonal covariances entries.\n\nFor a d dimensional Gaussian k-mixture model with mixing coefficients mixing, means ms, and covariances vs where the diagonal entries have been filled in and the off diagonals are variables.\n\n\n\n\n\n","category":"function"},{"location":"#Index","page":"Documentation","title":"Index","text":"","category":"section"},{"location":"","page":"Documentation","title":"Documentation","text":"","category":"page"}]
}
