import db from "@/db/db";

export async function GET(req) {
  const id = await req.nextUrl.searchParams.get("id");
  const topCategoryId = await req.nextUrl.searchParams.get("topCategoryId");

  if (id) {
    const getTopCategroies = await db.category.findMany({
      where: { id: String(id) },
    });
    return Response.json({ data: getTopCategroies });
  } else if (topCategoryId) {
    const getTopCategroies = await db.category.findMany({
      where: { topCategoryId: String(topCategoryId) },
    });
    return Response.json({ data: getTopCategroies });
  } else {
    const getTopCategroies = await db.category.findMany({
      include: {
        products: true,
      },
    });
    return Response.json({ data: getTopCategroies });
  }
}

export async function DELETE(req) {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    const deleteCategory = await db.category.delete({
      where: { id: String(id) },
    });

    return new Response(
      JSON.stringify({ success: true, data: deleteCategory }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  const createCategory = await db.category.create({
    data: {
      name: data.name,
      topCategory: {
        connect: {
          id: String(data.topCategoryId),
        },
      },
      image: data.image,
    },
  });
  return Response.json({ data: createCategory });
}

export async function PATCH(req) {
  const data = await req.json();
  try {
    const id = await req.nextUrl.searchParams.get("id");

    const updateCategory = await db.category.update({
      where: { id: String(id) },
      data: {
        name: data.name,
        topCategory: {
          connect: {
            id: String(data.topCategoryId),
          },
        },
        image: data.image,
      },
    });

    return new Response(
      JSON.stringify({ success: true, data: updateCategory }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
