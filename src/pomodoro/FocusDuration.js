import React, { useState } from "react";
import {secondsToDuration} from "../utils/duration";

export default function FocusDuration ({ duration }) {
    return (
        <>
        Focus Duration: {secondsToDuration(duration)}
        </>
    )
}