import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export default function templage() {
    return (
        <>
            <Head>
                <title>template Page | Tiny Honey Tip</title>
            </Head>
            <Header />
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <img src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" />
            </a>
            <Footer />
        </>
    );
}
