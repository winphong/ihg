import { NextResponse } from "next/server";
import databaseConnect from "../../../server/lib/database";
import Sport from "../../../server/entity/Sport";

export async function GET(req: Request) {
  try {
    await databaseConnect();

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.has("sport")) {
      const sport = await Sport.findOne({ name: searchParams.get("sport") });

      if (!sport) {
        return NextResponse.json(
          { error: "Sport not found!" },
          { status: 400 }
        );
      }

      return NextResponse.json(sport, { status: 200 });
    } else {
      const sports = await Sport.find().sort({ name: 1 });
      return NextResponse.json(sports, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   //   if (!isAdmin(req)) return res.status(403).json({ error: "Access denied" });

//   try {
//     const sport = new Sport(req.body);
//     await sport.save();
//     return res.status(201).json(sport);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// export async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   //   if (!isAdmin(req)) return res.status(403).json({ error: "Access denied" });

//   try {
//     const sport = await Sport.findOneAndUpdate(
//       { name: req.query.sport },
//       { description: req.body.description },
//       { new: true }
//     );

//     if (!sport) return res.status(404).json({ error: "Sport not found" });

//     return res.status(200).json(sport);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
