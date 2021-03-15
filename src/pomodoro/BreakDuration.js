import React, { useState } from "react";
import {secondsToDuration} from "../utils/duration";

export default function BreakDuration ({ duration }) {
    return (
        <>
        Break Duration: {secondsToDuration(duration)}
        </>
    )
}