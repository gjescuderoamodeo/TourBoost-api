import { PrismaClient } from '@prisma/client';

var singletonPrisma = (function(){

    var prisma;

    return {
      getPrisma: function() {
        if(!prisma) {
            prisma = new PrismaClient();
        }
        return prisma;
      }
    }
   
  })();
   
const instanciaSingleton = singletonPrisma.getPrisma();
export { instanciaSingleton };
