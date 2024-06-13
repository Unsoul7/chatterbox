"use client";
import { useEffect, useState } from "react";
import NameBio from "../components/NameBio";
import Options from "../components/Options";
import PostsGrid from "../components/PostsGrid";
import ProfileInfo from "../components/ProfileInfo";
import ProfileNav from "../components/ProfileNav";

export default function Profile() {

    return (
        <>
            <ProfileNav />
            <ProfileInfo />
            <NameBio/>
            <PostsGrid />
            <Options />
        </>
    )
}