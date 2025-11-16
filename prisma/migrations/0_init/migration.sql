--
-- PostgreSQL database dump
--

\restrict AgM99QgPpvIY8DV7QJQxjQ3A1KpqzfiJvfRI31ccYO1LZSw64hAOmsO2rULkiQa

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: on_update_current_timestamp_scimag(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.on_update_current_timestamp_scimag() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.timeadded = now();
   RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: error_report; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.error_report (
    id bigint NOT NULL,
    error_type character varying(45) NOT NULL,
    doi character varying(100) NOT NULL,
    message character varying(500) NOT NULL,
    timeadded timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: error_report_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.error_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: error_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.error_report_id_seq OWNED BY public.error_report.id;


--
-- Name: magazines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.magazines (
    id bigint NOT NULL,
    issnp character varying(10) DEFAULT ''::character varying NOT NULL,
    issne character varying(10) DEFAULT ''::character varying NOT NULL,
    magazine character varying(300) DEFAULT ''::character varying NOT NULL,
    abbr character varying(900) DEFAULT ''::character varying NOT NULL,
    description text NOT NULL,
    publisher character varying(400) DEFAULT ''::character varying NOT NULL,
    journalid character varying(45) DEFAULT ''::character varying NOT NULL,
    site_url character varying(128) DEFAULT ''::character varying NOT NULL,
    category character varying(445) DEFAULT ''::character varying NOT NULL,
    siteid_old character varying(45) DEFAULT ''::character varying NOT NULL,
    previous_title character varying(300) DEFAULT ''::character varying NOT NULL,
    real_title character varying(300) DEFAULT ''::character varying NOT NULL,
    years character varying(100) DEFAULT ''::character varying NOT NULL,
    volumes character varying(100) DEFAULT ''::character varying NOT NULL,
    prefix character varying(100) DEFAULT ''::character varying NOT NULL,
    timeadded timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: magazines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.magazines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: magazines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.magazines_id_seq OWNED BY public.magazines.id;


--
-- Name: publishers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.publishers (
    id bigint NOT NULL,
    doicode character varying(30) DEFAULT ''::character varying NOT NULL,
    publisher character varying(300) DEFAULT ''::character varying NOT NULL
);


--
-- Name: publishers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.publishers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: publishers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.publishers_id_seq OWNED BY public.publishers.id;


--
-- Name: scimag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scimag (
    id bigint NOT NULL,
    doi character varying(200) NOT NULL,
    doi2 character varying(100) DEFAULT ''::character varying NOT NULL,
    title character varying(2000) DEFAULT ''::character varying NOT NULL,
    author character varying(2000) DEFAULT ''::character varying NOT NULL,
    year character varying(10) DEFAULT ''::character varying NOT NULL,
    month character varying(10) DEFAULT ''::character varying NOT NULL,
    day character varying(10) DEFAULT ''::character varying NOT NULL,
    volume character varying(45) DEFAULT ''::character varying NOT NULL,
    issue character varying(95) DEFAULT ''::character varying NOT NULL,
    first_page character varying(45) DEFAULT ''::character varying NOT NULL,
    last_page character varying(45) DEFAULT ''::character varying NOT NULL,
    journal character varying(500) DEFAULT ''::character varying NOT NULL,
    isbn character varying(500) DEFAULT ''::character varying NOT NULL,
    issnp character varying(11) DEFAULT ''::character varying NOT NULL,
    issne character varying(10) DEFAULT ''::character varying NOT NULL,
    md5 character varying(32) DEFAULT ''::character varying NOT NULL,
    filesize bigint NOT NULL,
    timeadded timestamp with time zone,
    journalid character varying(45) DEFAULT ''::character varying NOT NULL,
    abstracturl character varying(500) DEFAULT ''::character varying NOT NULL,
    attribute1 character varying(500) DEFAULT ''::character varying NOT NULL,
    attribute2 character varying(1000) DEFAULT ''::character varying NOT NULL,
    attribute3 character varying(2000) DEFAULT ''::character varying NOT NULL,
    attribute4 character varying(5000) DEFAULT ''::character varying,
    attribute5 character varying(256) DEFAULT ''::character varying NOT NULL,
    attribute6 character varying(45) DEFAULT ''::character varying NOT NULL,
    visible character(3) DEFAULT ''::bpchar NOT NULL,
    pubmedid character varying(10) DEFAULT ''::character varying NOT NULL,
    pmc character varying(12) DEFAULT ''::character varying NOT NULL,
    pii character varying(45) DEFAULT ''::character varying NOT NULL,
    citation_count bigint DEFAULT '0'::bigint,
    abstract text,
    type text
);


--
-- Name: scimag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.scimag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scimag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.scimag_id_seq OWNED BY public.scimag.id;


--
-- Name: error_report id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.error_report ALTER COLUMN id SET DEFAULT nextval('public.error_report_id_seq'::regclass);


--
-- Name: magazines id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.magazines ALTER COLUMN id SET DEFAULT nextval('public.magazines_id_seq'::regclass);


--
-- Name: publishers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publishers ALTER COLUMN id SET DEFAULT nextval('public.publishers_id_seq'::regclass);


--
-- Name: scimag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scimag ALTER COLUMN id SET DEFAULT nextval('public.scimag_id_seq'::regclass);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: error_report idx_42686_primary; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.error_report
    ADD CONSTRAINT idx_42686_primary PRIMARY KEY (id);


--
-- Name: magazines idx_42699_primary; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.magazines
    ADD CONSTRAINT idx_42699_primary PRIMARY KEY (id);


--
-- Name: publishers idx_42738_primary; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT idx_42738_primary PRIMARY KEY (id);


--
-- Name: scimag idx_42748_primary; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scimag
    ADD CONSTRAINT idx_42748_primary PRIMARY KEY (id);


--
-- Name: idx_42699_issne; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42699_issne ON public.magazines USING btree (issne);


--
-- Name: idx_42699_issnp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42699_issnp ON public.magazines USING btree (issnp);


--
-- Name: idx_42699_journalid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42699_journalid ON public.magazines USING btree (journalid);


--
-- Name: idx_42699_magazine; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42699_magazine ON public.magazines USING btree (magazine);


--
-- Name: idx_42699_siteurl; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42699_siteurl ON public.magazines USING btree (site_url);


--
-- Name: idx_42738_doicodeunique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_42738_doicodeunique ON public.publishers USING btree (doicode);


--
-- Name: idx_42748_doiunique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_42748_doiunique ON public.scimag USING btree (doi);


--
-- Name: idx_42748_issneindex; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_issneindex ON public.scimag USING btree (issne);


--
-- Name: idx_42748_issnpindex; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_issnpindex ON public.scimag USING btree (issnp);


--
-- Name: idx_42748_issueindex; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_issueindex ON public.scimag USING btree (issue);


--
-- Name: idx_42748_md5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_md5 ON public.scimag USING btree (md5);


--
-- Name: idx_42748_pubmedindex; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_pubmedindex ON public.scimag USING btree (pubmedid);


--
-- Name: idx_42748_visibleid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_visibleid ON public.scimag USING btree (visible, id);


--
-- Name: idx_42748_volumeindex; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_42748_volumeindex ON public.scimag USING btree (volume);


--
-- Name: idx_scimag_abstract_fts; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_abstract_fts ON public.scimag USING gin (to_tsvector('english'::regconfig, abstract));


--
-- Name: idx_scimag_abstract_gin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_abstract_gin ON public.scimag USING gin (abstract public.gin_trgm_ops);


--
-- Name: idx_scimag_author_gin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_author_gin ON public.scimag USING gin (author public.gin_trgm_ops);


--
-- Name: idx_scimag_citation_count; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_citation_count ON public.scimag USING btree (citation_count);


--
-- Name: idx_scimag_doi2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_doi2 ON public.scimag USING btree (doi2);


--
-- Name: idx_scimag_journalid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_journalid ON public.scimag USING btree (journalid);


--
-- Name: idx_scimag_title_fts; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_title_fts ON public.scimag USING gin (to_tsvector('english'::regconfig, (title)::text));


--
-- Name: idx_scimag_title_gin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_title_gin ON public.scimag USING gin (title public.gin_trgm_ops);


--
-- Name: idx_scimag_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_type ON public.scimag USING btree (type);


--
-- Name: idx_scimag_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scimag_year ON public.scimag USING btree (year);


--
-- Name: scimag on_update_current_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_update_current_timestamp BEFORE UPDATE ON public.scimag FOR EACH ROW EXECUTE FUNCTION public.on_update_current_timestamp_scimag();


--
-- PostgreSQL database dump complete
--

\unrestrict AgM99QgPpvIY8DV7QJQxjQ3A1KpqzfiJvfRI31ccYO1LZSw64hAOmsO2rULkiQa

