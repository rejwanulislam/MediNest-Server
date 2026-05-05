

import { OrderStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { Order } from "../../types"



const addOrder = async (data: Order, userID: string) => {
  const { shippingAddress, totalAmount, status, items } = data


  try {
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.orders.create({
        data: {
          customerId: userID,
          shippingAddress,
          totalAmount,
          status,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              medicineName: item.name,
            })),
          },
        },
        include: {
          items: true
        }

      })

      return order
    })
    return result;
  } catch (error: any) {
    return { error: error.message }
  }
}




const getAllOrder = async () => {
  try {
    const result = await prisma.orders.findMany({
      include: {
        items: {
          include: {
            product: true
          },
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return result
  } catch (error: any) {
    return { error: error.message }
  }
}


const getOrderByID = async (id: string) => {
  console.log("getOrderByID service", id)
  try {
    const result = await prisma.orders.findMany({
      where: {
        customerId: id
      },
      include: {
        items: {
          include: {
            product: true
          },
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return result
  } catch (error: any) {
    return { error: error.message }
  }
}

const ggetOrderByID = async (customerId: string) => {
  console.log("Fetching orders for customerId:", customerId);
  try {
    const result = await prisma.orders.findMany({
      where: {
        customerId: customerId,
      },

    });

    return result;
  } catch (error: any) {
    console.error("Prisma Error:", error.message);
    return { error: error.message };
  }
};


const updateOrder = async (id: string, status: OrderStatus) => {

  try {
    const result = await prisma.orders.update({
      where: {
        id
      },
      data: {
        status
      }
    })
    return result
  } catch (error: any) {
    return { error: error.message }
  }
}

const deleteOrder = async (id: string) => {
  try {
    const result = await prisma.orders.delete({
      where: {
        id
      }
    })
    return result
  } catch (error: any) {
    return { error: error.message }
  }
}



export const orderService = {
  addOrder,
  getAllOrder,
  ggetOrderByID,
  updateOrder,
  deleteOrder
}