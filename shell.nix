{ pkgs ? import <nixos-unstable> {}, ... }:

let 
    python = 
        let packageOverrides = self: super: {
            opencv4 = super.opencv4.override {
                enableGtk2 = true;
                gtk2 = pkgs.gtk2;
            };
        };
        in
            pkgs.python39.override { inherit packageOverrides; self = python; };
in
pkgs.mkShell {
    name = "antispoofing_frontend_dev";
    buildInputs = with pkgs; [
        nodejs
        yarn
        (python.withPackages (p: with p; [
            opencv4
            tqdm
            requests
        ]))
    ];
}