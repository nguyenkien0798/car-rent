"use client";

import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import { Login } from "@/types/auth";

const styleInput = {
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputBase-input": {
    paddingTop: "8px !important",
    paddingLeft: "12px",
  },
  "& .MuiFormLabel-root": {
    fontSize: "18px",
  },
  "& .MuiInputBase-root:hover": {
    backgroundColor: "#FFFFFF",
  },
  "& .MuiInputAdornment-root": {
    mb: 2,
  },
};

export default function LoginForm({
  dictionary,
  handleLoginForm,
  errorMessage,
  handleChangeErrorMessage
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["login"];
  handleLoginForm: (data: Login) => void;
  errorMessage: string;
  handleChangeErrorMessage: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const authSchema = Yup.object()
    .shape({
      email: Yup.string()
        .required(`${dictionary.requiredEmail}`)
        .email(`${dictionary.formatEmail}`),
      password: Yup.string().required(`${dictionary.requiredPassword}`),
    })
    .required();

  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(authSchema),
    mode: "all",
  });

  const onSubmit = (data: Login) => {
    handleLoginForm(data);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:w-[500px] m-auto px-[24px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Typography>{dictionary.email}</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  sx={styleInput}
                  fullWidth
                  variant="filled"
                  placeholder={dictionary.placeholderEmail}
                  error={!!errors?.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChangeErrorMessage();
                    clearErrors("email");
                  }}
                  onBlur={(e) => {
                    field.onChange(
                      e.target.value
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/\s+/g, " "),
                    );
                  }}
                />
              );
            }}
          />
          <Typography sx={{ mt: "36px !important" }}>
            {dictionary.password}
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  sx={styleInput}
                  fullWidth
                  variant="filled"
                  placeholder={dictionary.placeholderPassword}
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ paddingBottom: "0 !important" }}
                        position="end"
                      >
                        <IconButton onClick={handleShowPassword} edge="end">
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChangeErrorMessage();
                    clearErrors("password");
                  }}
                />
              );
            }}
          />
        </Stack>
        {errorMessage && <p className="mt-8 text-center text-[12px] text-[#D32F2F] font-medium">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full mt-8 px-[20px] h-[42px] text-[#FFFFFF] text-[16px] bg-[#3563E9] font-bold hover:bg-[#54A6FF] rounded-[10px]"
        >
          {dictionary.signin}
        </button>
        <Typography sx={{ mt: 4, textAlign: "center" }}>
          {dictionary.dontHaveAnAccount}{" "}
          <Link className="underline text-[#254ACC]" href={`/register`}>
            {dictionary.signupHere}
          </Link>
        </Typography>
      </form>
    </div>
  );
}
