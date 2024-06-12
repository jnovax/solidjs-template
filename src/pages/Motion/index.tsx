import { Component, mergeProps } from "solid-js";
import { Motion } from "@motionone/solid";
import { stagger } from "motion";

const MotionPage: Component = () => {
    return (
        <div class="h-96 grid place-items-center">
            <Motion.div
                class="h-20 w-20 bg-[#00ffdb] rounded-md"
                animate={{ rotate: [90, 180, 270, 360], x: [0, -200, 300, 0] }}
                transition={{ duration: 2.5, delay: stagger(0.1) }}
            >
            </Motion.div>
        </div>
    )
}

export default MotionPage;