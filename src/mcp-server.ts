import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchTrain } from "./fns/search-train.js";
import { getPNRStatus } from "./fns/pnr-status.js";
import { trainStatus } from "./fns/train-status.js";

export const server = new McpServer({
    name: "Indian-Railway",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

server.tool(
    "search-train",
    "Search a train by its number",
    {
        trainNumber: z.number().describe("Five digit train number (eg: 12334)")
    },
    async ({ trainNumber }) => {
        const trainDetails = await searchTrain(trainNumber)

        if (!trainDetails) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve train details",
                    },
                ],
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: `Here are the train details ${trainDetails}`,
                },
            ],
        }
    }
)

server.tool(
    "pnr-status",
    "Check your PNR status",
    {
        pnr: z.number().describe("Ten digit PNR number")
    },
    async ({ pnr }) => {
        const pnrDetails = await getPNRStatus(pnr)

        if (!pnrDetails) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve PNR details",
                    },
                ],
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: `Here are the PNR details ${pnrDetails}`,
                },
            ],
        }
    }
)

server.tool(
    "train-status",
    "Check your train status",
    {
        trainNumber: z.number().describe("Train number")
    },
    async ({ trainNumber }) => {
        const trainDetails = await trainStatus(trainNumber)

        if (!trainDetails) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Failed to retrieve PNR details",
                    },
                ],
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: `Here are the PNR details ${trainDetails}`,
                },
            ],
        }
    }
)