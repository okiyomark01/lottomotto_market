import https from "https";
import fs from "fs";
import expressAsyncHandler from "express-async-handler";
import { error } from "console";


const BASE_HOSTNAME = "storage.bunnycdn.com";
const HOSTNAME = BASE_HOSTNAME;
const ACCESS_KEY = "e8ed9442-6a0f-427b-bf20fecd1635-ed72-4b90";
const STORAGE_ZONE_NAME = "lotto-market";

export const uploadFile = expressAsyncHandler(async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send("No file attached.");
    }

    const file = req.file;
    const filePath = file.path;
    const fileName = encodeURIComponent(file.originalname);

    const readStream = fs.createReadStream(filePath);

    const options = {
        method: "PUT",
        hostname: HOSTNAME,
        path: `/${STORAGE_ZONE_NAME}/${fileName}`,
        headers: {
            AccessKey: ACCESS_KEY,
            "Content-Type": "application/octet-stream",
        },
    };

    const reqBunny = https.request(options, (response) => {
        let responseBody = "";

        // Capture data
        response.on("data", (chunk) => {
            responseBody += chunk;
        });

        // On end, handle response
        response.on("end", () => {
            if (response.statusCode === 201 || response.statusCode === 200) {
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error in removing file:", error);
                    else console.log("File Removed Successfully");
                });
                res.status(201).json({
                    status: true,
                    msg: "File Uploaded",
                    path: `/${STORAGE_ZONE_NAME}/${fileName}`,
                    response: responseBody, // Send the response from BunnyCDN back
                });
            } else {
                res.status(response.statusCode).json({
                    status: false,
                    msg: "File Upload Failed",
                    response: responseBody,
                });
            }
        });
    });

    reqBunny.on("error", (error) => {
        console.error(error);
        fs.unlink(filePath, (err) => {
            if (err) console.error("Error in removing file:", err);
        });
        res.status(500).json({
            status: false,
            msg: "File Upload Failed!",
            error: error.message,
        });
    });

    // Pipe the file to BunnyCDN
    readStream.pipe(reqBunny);
});

export const deleteFile = expressAsyncHandler(async (req, res) => {
    const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${req.params.fileName}`;
    const options = {
        method: "DELETE",
        headers: { AccessKey: ACCESS_KEY },
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            res.status(200).json({ status:true, msg: "File Deleted Successfully!" });
        } else {
            const errorText = await response.text();
            res
            .status(response.status)
            .json({status:false, msg: `Error in deleting file : ${errorText}`});
        }
    } catch (error) {
        res.status(500).json({ status: false, msg: "Error in deleting file" });
    }
})
