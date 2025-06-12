-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "math" DOUBLE PRECISION,
    "literature" DOUBLE PRECISION,
    "foreignLanguage" DOUBLE PRECISION,
    "physics" DOUBLE PRECISION,
    "chemistry" DOUBLE PRECISION,
    "biology" DOUBLE PRECISION,
    "history" DOUBLE PRECISION,
    "geography" DOUBLE PRECISION,
    "civics" DOUBLE PRECISION,
    "foreignLangCode" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
