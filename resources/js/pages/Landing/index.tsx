import { useState } from "react"

export default function Landing(props: any) {
    const [currentStep, setCurrentStep] = useState(0)

    console.log(props)
    return (
        <div>
            <h1>
                Hello world
            </h1>
        </div>
    )
}
