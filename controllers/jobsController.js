import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"

import { BadRequestError, NotFoundError } from "../errors/index.js"
import { checkPermissions } from "../utils/index.js"
import mongoose from "mongoose"
import moment from "moment"

const createJob = async (req, res) => {
    const { company, position } = req.body
    if (!company || !position) {
        throw new BadRequestError("Please provide all values")
    }
    console.log(req.user)
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({ job })

}


const getAllJobs = async (req, res) => {
    const { search, status, jobType, sort } = req.query

    const queryObject = {
        createdBy: req.user.userId
    }

    if (status && status !== "all") {
        queryObject.status = status
    }

    if (jobType && jobType != "all") {
        queryObject.jobType = jobType
    }


    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }
    const result = Job.find(queryObject)

    if (sort === "oldest") {
        result.sort("createdAt")
    }
    if (sort === "latest") {
        result.sort("-createdAt")
    }
    if (sort === "a-z") {
        result.sort("position")
    }
    if (sort === "z-a") {
        result.sort("-position")
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)


    result.skip(skip).limit(limit)

    const jobs = await result

    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}


const updateJob = async (req, res) => {
    const { id: jobId } = req.params

    const { company, position } = req.body

    if (!company || !position) {
        throw new BadRequestError("please provide all values")
    }

    const job = await Job.findById(jobId)

    if (!job) {
        throw new NotFoundError(`there is no job id${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        runValidators: true,
        new: true
    })
    res.status(StatusCodes.OK).json({ updatedJob })
}


const deleteJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findById(jobId)

    if (!job) {
        throw new NotFoundError(`there is no job id${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)

    await job.remove()

    res.status(StatusCodes.OK).json({ msg: "Success! Job removed" })
}



const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ])


    stats = stats.reduce((acc, current) => {
        return {
            ...acc,
            [current._id]: current.count
        }
    }, {})


    const defaultStatus = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': -1, "_id.month": -1 } },
        { $limit: 6 }
    ])

    monthlyApplications = monthlyApplications.map(item => {
        let date = moment().month(item._id.month - 1).year(item._id.year).format("MMM Y")

        return { date, count: item.count }
    }).reverse()

    res.status(StatusCodes.OK).json({ defaultStatus, monthlyApplications })
}




export { createJob, deleteJob, getAllJobs, updateJob, showStats }