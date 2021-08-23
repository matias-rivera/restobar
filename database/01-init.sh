#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-08-23 12:14:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 208 (class 1259 OID 32842)
-- Name: Categories; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Categories" OWNER TO $APP_DB_USER;

--
-- TOC entry 207 (class 1259 OID 32840)
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3096 (class 0 OID 0)
-- Dependencies: 207
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- TOC entry 204 (class 1259 OID 32806)
-- Name: Clients; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."Clients" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) DEFAULT 'Address'::character varying NOT NULL,
    phone character varying(255) DEFAULT '999999999'::character varying NOT NULL,
    email character varying(255) NOT NULL,
    dni character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Clients" OWNER TO $APP_DB_USER;

--
-- TOC entry 203 (class 1259 OID 32804)
-- Name: Clients_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."Clients_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clients_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3097 (class 0 OID 0)
-- Dependencies: 203
-- Name: Clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."Clients_id_seq" OWNED BY public."Clients".id;


--
-- TOC entry 214 (class 1259 OID 32894)
-- Name: OrderProducts; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."OrderProducts" (
    id integer NOT NULL,
    quantity integer,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."OrderProducts" OWNER TO $APP_DB_USER;

--
-- TOC entry 213 (class 1259 OID 32892)
-- Name: OrderProducts_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."OrderProducts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrderProducts_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3098 (class 0 OID 0)
-- Dependencies: 213
-- Name: OrderProducts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."OrderProducts_id_seq" OWNED BY public."OrderProducts".id;


--
-- TOC entry 212 (class 1259 OID 32867)
-- Name: Orders; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."Orders" (
    id integer NOT NULL,
    total double precision NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    delivery boolean DEFAULT false NOT NULL,
    note character varying(255),
    "userId" integer NOT NULL,
    "clientId" integer NOT NULL,
    "tableId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Orders" OWNER TO $APP_DB_USER;

--
-- TOC entry 211 (class 1259 OID 32865)
-- Name: Orders_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Orders_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3099 (class 0 OID 0)
-- Dependencies: 211
-- Name: Orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;


--
-- TOC entry 210 (class 1259 OID 32852)
-- Name: Products; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."Products" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Products" OWNER TO $APP_DB_USER;

--
-- TOC entry 209 (class 1259 OID 32850)
-- Name: Products_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Products_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3100 (class 0 OID 0)
-- Dependencies: 209
-- Name: Products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."Products_id_seq" OWNED BY public."Products".id;


--
-- TOC entry 200 (class 1259 OID 32788)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO $APP_DB_USER;

--
-- TOC entry 202 (class 1259 OID 32795)
-- Name: Tables; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."Tables" (
    id integer NOT NULL,
    name character varying(255),
    occupied boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Tables" OWNER TO $APP_DB_USER;

--
-- TOC entry 201 (class 1259 OID 32793)
-- Name: Tables_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."Tables_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tables_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3101 (class 0 OID 0)
-- Dependencies: 201
-- Name: Tables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."Tables_id_seq" OWNED BY public."Tables".id;


--
-- TOC entry 206 (class 1259 OID 32825)
-- Name: Users; Type: TABLE; Schema: public; Owner: $APP_DB_USER
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    image character varying(255) DEFAULT '/avatar.png'::character varying NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Users" OWNER TO $APP_DB_USER;

--
-- TOC entry 205 (class 1259 OID 32823)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: $APP_DB_USER
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO $APP_DB_USER;

--
-- TOC entry 3102 (class 0 OID 0)
-- Dependencies: 205
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: $APP_DB_USER
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 2906 (class 2604 OID 32845)
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- TOC entry 2896 (class 2604 OID 32809)
-- Name: Clients id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Clients" ALTER COLUMN id SET DEFAULT nextval('public."Clients_id_seq"'::regclass);


--
-- TOC entry 2917 (class 2604 OID 32897)
-- Name: OrderProducts id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."OrderProducts" ALTER COLUMN id SET DEFAULT nextval('public."OrderProducts_id_seq"'::regclass);


--
-- TOC entry 2912 (class 2604 OID 32870)
-- Name: Orders id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);


--
-- TOC entry 2909 (class 2604 OID 32855)
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public."Products_id_seq"'::regclass);


--
-- TOC entry 2892 (class 2604 OID 32798)
-- Name: Tables id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Tables" ALTER COLUMN id SET DEFAULT nextval('public."Tables_id_seq"'::regclass);


--
-- TOC entry 2901 (class 2604 OID 32828)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3084 (class 0 OID 32842)
-- Dependencies: 208
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--

INSERT INTO public."Categories" VALUES (1, 'CERVEZAS', '2021-08-23 03:41:46.903509-03', '2021-08-23 03:41:46.903509-03');
INSERT INTO public."Categories" VALUES (2, 'GASEOSAS', '2021-08-23 03:41:46.903509-03', '2021-08-23 03:41:46.903509-03');
INSERT INTO public."Categories" VALUES (3, 'PIZZAS', '2021-08-23 03:41:46.903509-03', '2021-08-23 03:41:46.903509-03');
INSERT INTO public."Categories" VALUES (4, 'HAMBURGUESAS', '2021-08-23 03:41:46.903509-03', '2021-08-23 03:41:46.903509-03');
INSERT INTO public."Categories" VALUES (5, 'EMPANADAS', '2021-08-23 03:41:46.903509-03', '2021-08-23 03:41:46.903509-03');
INSERT INTO public."Categories" VALUES (6, 'LOMITOS', '2021-08-23 03:41:46.903509-03', '2021-08-23 03:41:46.903509-03');


--
-- TOC entry 3080 (class 0 OID 32806)
-- Dependencies: 204
-- Data for Name: Clients; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--

INSERT INTO public."Clients" VALUES (1, 'Particular', 'PARTICULAR 999', '999999999', 'particular@example.com', '999999999', '2021-08-23 03:41:46.915251-03', '2021-08-23 03:41:46.915251-03');
INSERT INTO public."Clients" VALUES (2, 'John Doe', 'Barrio Centro, Rivadavia 1030', '3804123123', 'johndoe@example.com', '40123123', '2021-08-23 03:41:46.915251-03', '2021-08-23 03:41:46.915251-03');


--
-- TOC entry 3090 (class 0 OID 32894)
-- Dependencies: 214
-- Data for Name: OrderProducts; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--



--
-- TOC entry 3088 (class 0 OID 32867)
-- Dependencies: 212
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--



--
-- TOC entry 3086 (class 0 OID 32852)
-- Dependencies: 210
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--

INSERT INTO public."Products" VALUES (1, 'HAMBRUGUESA CHICA', 120, 50, 4, '2021-08-23 03:41:47.126-03', '2021-08-23 03:41:47.126-03');
INSERT INTO public."Products" VALUES (2, 'HAMBRUGUESA GRANDE', 180, 70, 4, '2021-08-23 03:41:47.126-03', '2021-08-23 03:41:47.126-03');
INSERT INTO public."Products" VALUES (3, 'COCA COLA 3LTS', 180, 70, 2, '2021-08-23 03:41:47.126-03', '2021-08-23 03:41:47.126-03');
INSERT INTO public."Products" VALUES (4, 'COCA COLA 1.5LTS', 180, 70, 2, '2021-08-23 03:41:47.126-03', '2021-08-23 03:41:47.126-03');


--
-- TOC entry 3076 (class 0 OID 32788)
-- Dependencies: 200
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--

INSERT INTO public."SequelizeMeta" VALUES ('20210408050330-create-table.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210408051244-create-client.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210408052326-create-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210408064209-create-category.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210408064602-create-product.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210408070645-create-order.js');
INSERT INTO public."SequelizeMeta" VALUES ('20210408071614-create-order-product.js');


--
-- TOC entry 3078 (class 0 OID 32795)
-- Dependencies: 202
-- Data for Name: Tables; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--

INSERT INTO public."Tables" VALUES (1, 'PATIO 1', false, '2021-08-23 03:41:46.913571-03', '2021-08-23 03:41:46.913571-03');
INSERT INTO public."Tables" VALUES (2, 'PATIO 2', false, '2021-08-23 03:41:46.913571-03', '2021-08-23 03:41:46.913571-03');
INSERT INTO public."Tables" VALUES (3, 'PATIO 3', false, '2021-08-23 03:41:46.913571-03', '2021-08-23 03:41:46.913571-03');
INSERT INTO public."Tables" VALUES (4, 'INTERIOR 1', false, '2021-08-23 03:41:46.913571-03', '2021-08-23 03:41:46.913571-03');
INSERT INTO public."Tables" VALUES (5, 'INTERIOR 2', false, '2021-08-23 03:41:46.913571-03', '2021-08-23 03:41:46.913571-03');
INSERT INTO public."Tables" VALUES (6, 'BARRA 1', false, '2021-08-23 03:41:46.913571-03', '2021-08-23 03:41:46.913571-03');


--
-- TOC entry 3082 (class 0 OID 32825)
-- Dependencies: 206
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: $APP_DB_USER
--

INSERT INTO public."Users" VALUES (1, 'Admin', 'admin@example.com', '$APP_USER_PASS', '/avatar.png', true, '2021-08-23 03:41:46.88757-03', '2021-08-23 03:41:46.88757-03');
INSERT INTO public."Users" VALUES (2, 'User', 'user@example.com', '$APP_USER_PASS', '/avatar.png', false, '2021-08-23 03:41:46.88757-03', '2021-08-23 03:41:46.88757-03');


--
-- TOC entry 3103 (class 0 OID 0)
-- Dependencies: 207
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 6, true);


--
-- TOC entry 3104 (class 0 OID 0)
-- Dependencies: 203
-- Name: Clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."Clients_id_seq"', 2, true);


--
-- TOC entry 3105 (class 0 OID 0)
-- Dependencies: 213
-- Name: OrderProducts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."OrderProducts_id_seq"', 1, false);


--
-- TOC entry 3106 (class 0 OID 0)
-- Dependencies: 211
-- Name: Orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."Orders_id_seq"', 1, false);


--
-- TOC entry 3107 (class 0 OID 0)
-- Dependencies: 209
-- Name: Products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."Products_id_seq"', 4, true);


--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 201
-- Name: Tables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."Tables_id_seq"', 6, true);


--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 205
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: $APP_DB_USER
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- TOC entry 2933 (class 2606 OID 32849)
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 32822)
-- Name: Clients Clients_dni_key; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_dni_key" UNIQUE (dni);


--
-- TOC entry 2925 (class 2606 OID 32820)
-- Name: Clients Clients_email_key; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_email_key" UNIQUE (email);


--
-- TOC entry 2927 (class 2606 OID 32818)
-- Name: Clients Clients_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);


--
-- TOC entry 2939 (class 2606 OID 32899)
-- Name: OrderProducts OrderProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."OrderProducts"
    ADD CONSTRAINT "OrderProducts_pkey" PRIMARY KEY (id);


--
-- TOC entry 2937 (class 2606 OID 32876)
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- TOC entry 2935 (class 2606 OID 32859)
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 32792)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 2921 (class 2606 OID 32803)
-- Name: Tables Tables_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Tables"
    ADD CONSTRAINT "Tables_pkey" PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 32839)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 2931 (class 2606 OID 32837)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 2944 (class 2606 OID 32900)
-- Name: OrderProducts OrderProducts_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."OrderProducts"
    ADD CONSTRAINT "OrderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Orders"(id) ON DELETE CASCADE;


--
-- TOC entry 2945 (class 2606 OID 32905)
-- Name: OrderProducts OrderProducts_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."OrderProducts"
    ADD CONSTRAINT "OrderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Products"(id) ON DELETE CASCADE;


--
-- TOC entry 2942 (class 2606 OID 32882)
-- Name: Orders Orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id) ON DELETE CASCADE;


--
-- TOC entry 2943 (class 2606 OID 32887)
-- Name: Orders Orders_tableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES public."Tables"(id) ON DELETE CASCADE;


--
-- TOC entry 2941 (class 2606 OID 32877)
-- Name: Orders Orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- TOC entry 2940 (class 2606 OID 32860)
-- Name: Products Products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: $APP_DB_USER
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON DELETE CASCADE;


-- Completed on 2021-08-23 12:14:10

--
-- PostgreSQL database dump complete
--


  COMMIT;
EOSQL