
-- AlterTable
ALTER TABLE public.scimag ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "month" DROP NOT NULL,
ALTER COLUMN "day" DROP NOT NULL;

-- Convert empty strings to NULL before dropping NOT NULL constraint
UPDATE public.scimag
SET 
  year = NULLIF(year, ''),
  month = NULLIF(month, ''),
  day = NULLIF(day, '');
