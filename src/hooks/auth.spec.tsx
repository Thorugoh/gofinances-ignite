import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { AuthProvider, useAuth } from "./auth";
import { logInAsync } from "expo-google-app-auth";

jest.mock("expo-google-app-auth");

describe("Auth Hook", () => {
  it("should be able to sign in with a existing google account", async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      user: {
        id: "any_id",
        email: "victor@email.com",
        name: "Victor Oliveira",
        photo: "any_photo.png",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("victor@email.com");
  });

  it("user should not connect if cancel google authentication", async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
