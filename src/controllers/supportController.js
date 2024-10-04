import { Support } from "../models/supportSchema.js";
import { AppError } from "../middlewares/errorHandler.js";
import expressAsyncHandler from "express-async-handler";

// @desc create new support
// @router /api/support/
// @access Private

export const createSupport = expressAsyncHandler(async (req, res) => {
    try {
        const support = new Support(req.body);
        await support.save();
        res.status(201).json({ status: true, data: support });
    } catch (error) {
        throw new AppError(error);
    }
});

// @desc get All support
// @router /api/support/
// @access Private

export const getAllSupport = expressAsyncHandler(async (req, res) => {
    try {
        const supports = await Support.find().populate("user product assignedTo assignedBy");
        res.status(200).json({ status: true, data: supports });
    } catch (error) {
        throw new AppError(error);
    }
});

// @desc get support by id
// @router /api/support/:id
// @access Private

export const getSupportById = expressAsyncHandler(async (req, res) => {
    try {
        const support = await Support.findById(req.params.id).populate("user product assignedTo assignedBy");
        if (!support) {
            return res
                .status(404)
                .json({ status: false, message:"Support Query Not Found!" });
        }
        res.status(200).json({ status: true, data: support });
    } catch (error) {
        throw new AppError(error);
    }
});

// @desc Update support by Id
// @router /api/support/
// @access Private

export const updateSupportById = expressAsyncHandler(async (req, res) => {
    try {
        const support = await Support.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!support) {
            return res
                .status(404)
                .json({ status: false, message:"Support Query Not Found!" });
        }
        res.status(200).json({ status: true, data: support });
    } catch (error) {
        throw new AppError(error);
    }
});

// @desc Delete support by Id
// @router /api/support/
// @access Private

export const deleteSupportById = expressAsyncHandler(async (req, res) => {
    try {
        const support = await Support.findByIdAndDelete(req.params.id);
        if (!support) {
            return res
                .status(404)
                .json({ status: false, message:"Support Query Not Found!" });
        }
        res.status(200).json({ status: true, message: "Support Deleted Successfully!" });
    } catch (error) {
        throw new AppError(error);
    }
});

// @desc assign support 
// @router /api/support/
// @access Private

export const assignSupport = expressAsyncHandler(async (req, res) => {
    try {
        const { assignedTo, assignedBy } = req.body;
        const support = await Support.findByIdAndUpdate(req.params.id,
            { assignedTo, assignedBy },
            { new: true }
        ).populate("user product assignedTo assignedBy");
        if (!support) {
            return res
                .status(404)
                .json({ status: false, message:"Support Query Not Found!" });
        }
        res.status(200).json({ status: true, data: support });
    } catch (error) {
        throw new AppError(error);
    }
});

// @desc update support status
// @router /api/support/
// @access Private

export const updateSupportStatus = expressAsyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        const support = await Support.findByIdAndUpdate(req.params.id,
            { status },
            { new: true }
        ).populate("user product assignedTo assignedBy");
        if (!support) {
            return res
                .status(404)
                .json({ status: false, message:"Support Query Not Found!" });
        }
        res.status(200).json({ status: true, data: support });
    } catch (error) {
        throw new AppError(error);
    }
});