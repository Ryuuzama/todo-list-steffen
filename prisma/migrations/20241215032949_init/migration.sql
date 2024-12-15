-- DropEnum
--DROP TYPE "crdb_internal_region";

-- CreateTable
CREATE TABLE "Task" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "completed" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
