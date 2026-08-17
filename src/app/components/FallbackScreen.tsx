export default function FallbackScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-black scanlines">
      <div className="max-w-2xl border border-warning p-8 bg-black/80 shadow-[0_0_30px_rgba(255,59,59,0.3)]">
        <h1 className="text-4xl md:text-5xl font-bold text-warning mb-6 glitch-text tracking-widest uppercase">
          Uplink Failure
        </h1>
        
        <div className="space-y-6 text-foreground font-mono text-left">
          <p className="text-lg">
            <span className="text-warning font-bold">[ERR]</span> LOCAL_INFERENCE_ENGINE_NOT_FOUND
          </p>
          
          <p>
            This terminal requires a direct, on-device neural uplink to interface with the guard network. 
            Your current hardware/software configuration does not support this protocol.
          </p>

          <div className="border border-cyan/30 p-4 bg-cyan/5">
            <h2 className="text-cyan font-bold mb-2 uppercase text-sm tracking-widest">Required Protocol:</h2>
            <ul className="list-none space-y-2 text-sm text-foreground/80">
              <li>1. Chrome Desktop Browser (version 148+ required for standard deployment, version 128+ for experimental preview).</li>
              <li>2. Chrome flags enabled for local inference (chrome://flags/#prompt-api-for-gemini-nano).</li>
              <li>3. A compatible desktop OS (Windows, macOS, Linux, ChromeOS). Mobile uplinks are explicitly rejected by the network.</li>
            </ul>
          </div>

          <p className="text-sm text-foreground/60">
            Awaiting compatible connection...
          </p>
        </div>
      </div>
    </div>
  );
}
