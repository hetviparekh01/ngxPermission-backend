import { ObjectId } from "mongodb";
import { PipelineStage } from "mongoose";

export const getPermissionPipleline:PipelineStage[]=[
    {
        $lookup: {
            from: "modules",
            localField: "moduleId",
            foreignField: "_id",
            as: "moduleDetails"
        }
    },
    {
        $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "roleDetails"
        }
    },
    {
        $unwind: {
            path: "$moduleDetails",
        }
    },
    {
        $unwind: {
            path: "$roleDetails"
        }
    },
    {
        $addFields: {
            roleName: "$roleDetails.roleName",
            moduleName: "$moduleDetails.moduleName"
        }
    }
]


export const ProjectPipeline:PipelineStage[]=[
    {
        $project: {
            read: {
                $cond: {
                    if: "$read",
                    then: "$read",
                    else: "$$REMOVE"
                }
            },
            write: {
                $cond: {
                    if: "$write",
                    then: "$write",
                    else: "$$REMOVE",
                },
            },
            roleName: 1
        }
    }
]