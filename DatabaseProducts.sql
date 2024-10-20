-- Database: PruebaProducts

-- DROP DATABASE IF EXISTS "PruebaProducts";

CREATE DATABASE "PruebaProducts"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Ecuador.1252'
    LC_CTYPE = 'Spanish_Ecuador.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Table: public.Categories

-- DROP TABLE IF EXISTS public."Categories";

CREATE TABLE IF NOT EXISTS public."Categories"
(
    "nIdCategory" integer NOT NULL DEFAULT nextval('"Categories_nIdCategory_seq"'::regclass),
    "sNameCategory" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Categories_pkey" PRIMARY KEY ("nIdCategory")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Categories"
    OWNER to admin97;


-- Table: public.Products

-- DROP TABLE IF EXISTS public."Products";

CREATE TABLE IF NOT EXISTS public."Products"
(
    id integer NOT NULL DEFAULT nextval('"Products_id_seq"'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    price numeric(10,2),
    description character varying(200) COLLATE pg_catalog."default",
    stock boolean,
    link character varying(255) COLLATE pg_catalog."default",
    category integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Products_pkey" PRIMARY KEY (id),
    CONSTRAINT "Products_category_fkey" FOREIGN KEY (category)
        REFERENCES public."Categories" ("nIdCategory") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Products"
    OWNER to admin97;


-- Table: public.Roles

-- DROP TABLE IF EXISTS public."Roles";

CREATE TABLE IF NOT EXISTS public."Roles"
(
    "nRoleId" integer NOT NULL DEFAULT nextval('"Roles_nRoleId_seq"'::regclass),
    "sName" character varying(100) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    CONSTRAINT "Roles_pkey" PRIMARY KEY ("nRoleId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Roles"
    OWNER to admin97;



-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    "nIdUser" integer NOT NULL DEFAULT nextval('"Users_nIdUser_seq"'::regclass),
    "sNameUser" character varying(255) COLLATE pg_catalog."default",
    "sLastNameUser" character varying(100) COLLATE pg_catalog."default",
    "sEmail" character varying(100) COLLATE pg_catalog."default",
    "sPassword" character varying(100) COLLATE pg_catalog."default",
    "sAddressUser" character varying(200) COLLATE pg_catalog."default",
    "nRoleId" integer,
    "sPhoneNumber" character varying(10) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("nIdUser"),
    CONSTRAINT "Users_sEmail_key" UNIQUE ("sEmail"),
    CONSTRAINT "Users_nRoleId_fkey" FOREIGN KEY ("nRoleId")
        REFERENCES public."Roles" ("nRoleId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to admin97;