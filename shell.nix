{ pkgs ? import <nixpkgs> {}, ... }:

pkgs.mkShell {
    name = "antispoofing_frontend_dev";
    buildInputs = with pkgs; [
        nodejs
        yarn
    ];
}