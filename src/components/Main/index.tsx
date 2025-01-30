import Spline from "@splinetool/react-spline/next";

export default function Main() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Spline Component */}
      <Spline
        scene="https://prod.spline.design/SpcZMVZL-BwpHCA0/scene.splinecode"
      />

      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
        Your Overlay Text Here
      </div>
    </div>
  );
}
