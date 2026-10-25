import { Job } from '../models/Job.js';
import { Company } from '../models/Company.js';

// @desc    Get all published jobs with multi-facet filters
// @route   GET /api/jobs
// @access  Public
export async function getJobs(req, res, next) {
  try {
    const { category, city, domain, workMode, groups, q, sort } = req.query;

    const query = { status: 'Published' };

    if (category) query.category = category;
    if (city) query.city = new RegExp(city, 'i');
    if (domain) query.domain = new RegExp(domain, 'i');
    if (workMode) query.workMode = workMode;
    if (groups) query.requiredGroups = groups;

    if (q) {
      query.$or = [
        { title: new RegExp(q, 'i') },
        { domain: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'stipend') sortOption = { stipendMax: -1 };

    const jobs = await Job.find(query).populate('companyId').sort(sortOption);

    res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export async function getJobById(req, res, next) {
  try {
    const job = await Job.findById(req.params.id).populate('companyId');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job vacancy not found' });
    }
    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
}

// @desc    Create new job posting (Employer only)
// @route   POST /api/jobs
// @access  Private (Employer)
export async function createJob(req, res, next) {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(400).json({ success: false, message: 'No registered company found for this employer' });
    }

    const jobData = {
      ...req.body,
      companyId: company._id,
      // If company is verified, can go to Published or Pending Review
      status: company.isVerified ? 'Published' : 'Pending Review',
    };

    const job = await Job.create(jobData);
    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
}

// @desc    Update job status (Pause, Close, Draft)
// @route   PUT /api/jobs/:id
// @access  Private (Employer / Admin)
export async function updateJob(req, res, next) {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
}
