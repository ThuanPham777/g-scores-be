-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "math" DOUBLE PRECISION,
    "literature" DOUBLE PRECISION,
    "foreignlanguage" DOUBLE PRECISION,
    "physics" DOUBLE PRECISION,
    "chemistry" DOUBLE PRECISION,
    "biology" DOUBLE PRECISION,
    "history" DOUBLE PRECISION,
    "geography" DOUBLE PRECISION,
    "civics" DOUBLE PRECISION,
    "foreignlangcode" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);
